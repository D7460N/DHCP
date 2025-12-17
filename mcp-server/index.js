#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  GetPromptRequestSchema,
  ListPromptsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

/**
 * D7460N DHCP MCP Server
 * 
 * This Model Context Protocol server provides:
 * - Context management and restoration
 * - Architecture compliance checking
 * - Progress tracking and focus management
 * - Real-time guidance for AI assistants
 */
class D7460NMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'd7460n-dhcp-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
          prompts: {},
          resources: {},
        },
      }
    );

    this.contextState = {
      currentTask: null,
      architecturalFocus: [],
      progressTracking: {},
      lastActivity: new Date(),
      complianceChecks: []
    };

    this.setupHandlers();
  }

  setupHandlers() {
    // Tool handlers
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'restore_context',
          description: 'Restore full project context from documentation and current state',
          inputSchema: {
            type: 'object',
            properties: {
              focus_area: {
                type: 'string',
                description: 'Specific area to focus on (e.g., "css-first-patterns", "form-handling", "api-integration")',
                enum: ['css-first-patterns', 'form-handling', 'api-integration', 'architecture-overview', 'current-issues']
              }
            }
          }
        },
        {
          name: 'check_architectural_compliance',
          description: 'Validate that code changes comply with D7460N architecture principles',
          inputSchema: {
            type: 'object',
            properties: {
              file_path: {
                type: 'string',
                description: 'Path to file to check for compliance'
              },
              change_description: {
                type: 'string',
                description: 'Description of the change being made'
              }
            },
            required: ['file_path']
          }
        },
        {
          name: 'track_progress',
          description: 'Track progress on current task and maintain focus',
          inputSchema: {
            type: 'object',
            properties: {
              task_description: {
                type: 'string',
                description: 'Description of the current task'
              },
              status: {
                type: 'string',
                enum: ['started', 'in_progress', 'completed', 'blocked']
              },
              notes: {
                type: 'string',
                description: 'Additional notes or context'
              }
            },
            required: ['task_description', 'status']
          }
        },
        {
          name: 'validate_css_first_pattern',
          description: 'Specifically validate CSS-first hidden checkbox patterns',
          inputSchema: {
            type: 'object',
            properties: {
              html_snippet: {
                type: 'string',
                description: 'HTML code snippet to validate'
              },
              css_snippet: {
                type: 'string',
                description: 'Related CSS code snippet'
              }
            }
          }
        },
        {
          name: 'get_architectural_guidance',
          description: 'Get specific guidance on D7460N architectural decisions',
          inputSchema: {
            type: 'object',
            properties: {
              question: {
                type: 'string',
                description: 'Specific architectural question or scenario'
              },
              context: {
                type: 'string',
                description: 'Additional context about the situation'
              }
            },
            required: ['question']
          }
        }
      ]
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'restore_context':
            return await this.restoreContext(args.focus_area);
          
          case 'check_architectural_compliance':
            return await this.checkArchitecturalCompliance(args.file_path, args.change_description);
          
          case 'track_progress':
            return await this.trackProgress(args.task_description, args.status, args.notes);
          
          case 'validate_css_first_pattern':
            return await this.validateCSSFirstPattern(args.html_snippet, args.css_snippet);
          
          case 'get_architectural_guidance':
            return await this.getArchitecturalGuidance(args.question, args.context);
          
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error executing ${name}: ${error.message}`
            }
          ]
        };
      }
    });

    // Prompt handlers
    this.server.setRequestHandler(ListPromptsRequestSchema, async () => ({
      prompts: [
        {
          name: 'architecture_reminder',
          description: 'Complete architectural context and principles reminder'
        },
        {
          name: 'css_first_guide',
          description: 'Detailed guide on CSS-first hidden checkbox patterns'
        },
        {
          name: 'compliance_checklist',
          description: 'Checklist for ensuring D7460N compliance'
        }
      ]
    }));

    this.server.setRequestHandler(GetPromptRequestSchema, async (request) => {
      const { name } = request.params;

      switch (name) {
        case 'architecture_reminder':
          return await this.getArchitectureReminder();
        case 'css_first_guide':
          return await this.getCSSFirstGuide();
        case 'compliance_checklist':
          return await this.getComplianceChecklist();
        default:
          throw new Error(`Unknown prompt: ${name}`);
      }
    });

    // Resource handlers
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
      resources: [
        {
          uri: 'file://docs/PROJECT-STATE.md',
          name: 'Project State Documentation',
          description: 'Complete project context and current status',
          mimeType: 'text/markdown'
        },
        {
          uri: 'file://AGENT.md',
          name: 'Agent Configuration',
          description: 'Universal agent configuration and guidelines',
          mimeType: 'text/markdown'
        },
        {
          uri: 'file://AGENTS.md',
          name: 'Agent Instructions',
          description: 'Detailed agent instructions and conventions',
          mimeType: 'text/markdown'
        }
      ]
    }));

    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params;
      
      if (uri.startsWith('file://')) {
        const filePath = path.join(PROJECT_ROOT, uri.replace('file://', ''));
        try {
          const content = await fs.readFile(filePath, 'utf-8');
          return {
            contents: [
              {
                uri,
                mimeType: 'text/markdown',
                text: content
              }
            ]
          };
        } catch (error) {
          throw new Error(`Failed to read file: ${error.message}`);
        }
      }
      
      throw new Error(`Unsupported URI: ${uri}`);
    });
  }

  async restoreContext(focusArea = 'architecture-overview') {
    try {
      // Read key documentation files
      const projectState = await fs.readFile(path.join(PROJECT_ROOT, 'docs/PROJECT-STATE.md'), 'utf-8');
      const agentMd = await fs.readFile(path.join(PROJECT_ROOT, 'AGENT.md'), 'utf-8');
      const agentsMd = await fs.readFile(path.join(PROJECT_ROOT, 'AGENTS.md'), 'utf-8');

      // Extract critical architectural insights
      const cssFirstSection = this.extractSection(projectState, '## 🎨 **CRITICAL ARCHITECTURE INSIGHT: CSS-FIRST STATE MACHINE PATTERN**');
      const immediateSteps = this.extractSection(projectState, '## 🚀 IMMEDIATE NEXT STEPS');
      
      let contextResponse = `# D7460N DHCP Project Context Restored

## 🎯 Current Project State
- **Architecture**: D7460N - Zero-dependency, browser-native SPA
- **Philosophy**: CSS-first state management, minimal JavaScript
- **Critical Pattern**: Hidden checkbox state machine for UI logic
- **Status**: Modularization complete, testing phase in progress

## 🚨 CRITICAL ARCHITECTURAL PRINCIPLES

### CSS-First Hidden Checkbox Pattern
${cssFirstSection}

## 📋 Current Focus Areas
${immediateSteps}

## 🔄 Context State
- Last Activity: ${this.contextState.lastActivity.toISOString()}
- Current Task: ${this.contextState.currentTask || 'Not set'}
- Progress Tracking: ${Object.keys(this.contextState.progressTracking).length} items tracked
`;

      if (focusArea === 'css-first-patterns') {
        contextResponse += `\n## 🎨 CSS-First Pattern Deep Dive

**NEVER "FIX" THE CSS-FIRST PATTERN!** This is intentionally advanced:

\`\`\`html
<label role="button" aria-label="Save">
  Save
  <input type="checkbox" />
</label>
\`\`\`

**Benefits**: 100-1000x faster than JS, secure, accessible, works without JS
**Rules**: Never replace with <button>, never add JS event handlers
`;
      }

      this.contextState.lastActivity = new Date();
      this.contextState.architecturalFocus.push(focusArea);

      return {
        content: [
          {
            type: 'text',
            text: contextResponse
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error restoring context: ${error.message}`
          }
        ]
      };
    }
  }

  async checkArchitecturalCompliance(filePath, changeDescription = '') {
    try {
      const fullPath = path.join(PROJECT_ROOT, filePath);
      const fileContent = await fs.readFile(fullPath, 'utf-8');
      const fileExt = path.extname(filePath);
      
      const violations = [];
      const warnings = [];
      const recommendations = [];

      // Check for architectural violations based on file type
      if (fileExt === '.html') {
        // HTML compliance checks
        if (fileContent.includes('addEventListener')) {
          violations.push('❌ HTML contains addEventListener - use CSS-first patterns instead');
        }
        if (fileContent.includes('onclick=') || fileContent.includes('onchange=')) {
          warnings.push('⚠️ Inline event handlers found - prefer CSS state management');
        }
        if (fileContent.includes('<button') && !fileContent.includes('role="button"')) {
          warnings.push('⚠️ Consider using label role="button" with hidden checkbox pattern');
        }
        if (!fileContent.includes('type="checkbox"') && fileContent.includes('role="button"')) {
          violations.push('❌ Button role without hidden checkbox - breaks CSS-first pattern');
        }
      }

      if (fileExt === '.css') {
        // CSS compliance checks
        if (fileContent.includes('display: none') && !fileContent.includes(':has(')) {
          recommendations.push('💡 Consider using :has() selectors for state-based visibility');
        }
        if (fileContent.includes('!important')) {
          warnings.push('⚠️ !important usage detected - ensure cascade specificity is properly managed');
        }
      }

      if (fileExt === '.js') {
        // JavaScript compliance checks
        if (fileContent.includes('addEventListener')) {
          violations.push('❌ JavaScript uses addEventListener - violates CSS-first principle');
        }
        if (fileContent.includes('style.display') || fileContent.includes('classList.')) {
          violations.push('❌ JavaScript manipulates DOM styling - use CSS state management instead');
        }
        if (fileContent.includes('querySelector') && fileContent.includes('click')) {
          warnings.push('⚠️ JavaScript click handling detected - ensure it\'s for data operations only');
        }
      }

      const complianceScore = violations.length === 0 ? 
        (warnings.length === 0 ? 100 : 80 - (warnings.length * 10)) : 
        Math.max(0, 60 - (violations.length * 20));

      const result = `# Architectural Compliance Check: ${filePath}

## 📊 Compliance Score: ${complianceScore}%

${changeDescription ? `## 📝 Change Description\n${changeDescription}\n` : ''}

## 🚨 Violations (${violations.length})
${violations.map(v => v).join('\n') || 'None found ✅'}

## ⚠️ Warnings (${warnings.length})
${warnings.map(w => w).join('\n') || 'None found ✅'}

## 💡 Recommendations (${recommendations.length})
${recommendations.map(r => r).join('\n') || 'None at this time ✅'}

## 🎯 D7460N Architecture Principles
- ✅ CSS handles ALL UI logic via :has(), :checked, container queries
- ✅ JavaScript is data-layer only (fetch, inject, CRUD)
- ✅ Hidden checkbox pattern for interactive elements
- ✅ Progressive enhancement (works without JS)
- ✅ Zero dependencies, no build tools
`;

      // Store compliance check
      this.contextState.complianceChecks.push({
        timestamp: new Date(),
        filePath,
        score: complianceScore,
        violations: violations.length,
        warnings: warnings.length
      });

      return {
        content: [
          {
            type: 'text',
            text: result
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error checking compliance for ${filePath}: ${error.message}`
          }
        ]
      };
    }
  }

  async trackProgress(taskDescription, status, notes = '') {
    const timestamp = new Date();
    const taskId = `task_${timestamp.getTime()}`;

    this.contextState.progressTracking[taskId] = {
      description: taskDescription,
      status,
      notes,
      timestamp,
      lastUpdated: timestamp
    };

    if (status === 'started') {
      this.contextState.currentTask = taskDescription;
    } else if (status === 'completed') {
      this.contextState.currentTask = null;
    }

    this.contextState.lastActivity = timestamp;

    const progressSummary = Object.values(this.contextState.progressTracking)
      .reduce((acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
      }, {});

    const result = `# Progress Tracking Update

## 📋 Current Task
**${taskDescription}** - Status: **${status.toUpperCase()}**

${notes ? `**Notes**: ${notes}\n` : ''}

## 📊 Overall Progress Summary
- Started: ${progressSummary.started || 0}
- In Progress: ${progressSummary.in_progress || 0}
- Completed: ${progressSummary.completed || 0}
- Blocked: ${progressSummary.blocked || 0}

## 🎯 Focus Maintenance
- Current Task: ${this.contextState.currentTask || 'None active'}
- Last Activity: ${this.contextState.lastActivity.toISOString()}
- Architectural Focus Areas: ${this.contextState.architecturalFocus.join(', ') || 'None set'}

## ⚡ Quick Context Reminder
- Remember: CSS-first hidden checkbox patterns are INTENTIONAL
- Remember: Zero dependencies, no build tools
- Remember: JavaScript is data-layer only
- Remember: Progressive enhancement required
`;

    return {
      content: [
        {
          type: 'text',
          text: result
        }
      ]
    };
  }

  async validateCSSFirstPattern(htmlSnippet = '', cssSnippet = '') {
    const issues = [];
    const recommendations = [];
    let isValid = true;

    if (htmlSnippet) {
      // Check for proper hidden checkbox pattern
      if (htmlSnippet.includes('role="button"')) {
        if (!htmlSnippet.includes('type="checkbox"')) {
          issues.push('❌ Button role without hidden checkbox - pattern incomplete');
          isValid = false;
        } else {
          recommendations.push('✅ Proper label role="button" with hidden checkbox detected');
        }
      }

      if (htmlSnippet.includes('<button')) {
        issues.push('⚠️ Using <button> element - consider CSS-first pattern instead');
      }

      if (htmlSnippet.includes('onclick=') || htmlSnippet.includes('addEventListener')) {
        issues.push('❌ JavaScript event handlers detected - violates CSS-first principle');
        isValid = false;
      }
    }

    if (cssSnippet) {
      // Check for proper CSS state management
      if (cssSnippet.includes(':checked')) {
        recommendations.push('✅ Using :checked pseudo-class for state management');
      }

      if (cssSnippet.includes(':has(')) {
        recommendations.push('✅ Using :has() for advanced state queries');
      }

      if (cssSnippet.includes('display: none') && !cssSnippet.includes(':has(')) {
        recommendations.push('💡 Consider using :has() selectors for more sophisticated visibility logic');
      }
    }

    const result = `# CSS-First Pattern Validation

## 🎯 Pattern Validity: ${isValid ? '✅ VALID' : '❌ NEEDS ATTENTION'}

## 🚨 Issues Found (${issues.length})
${issues.join('\n') || 'None found ✅'}

## 💡 Recommendations (${recommendations.length})
${recommendations.join('\n') || 'None at this time'}

## 📖 CSS-First Pattern Reference

### ✅ Correct Pattern:
\`\`\`html
<label role="button" aria-label="Save">
  Save
  <input type="checkbox" />
</label>
\`\`\`

\`\`\`css
label[role="button"]:has(input:checked) {
  background: var(--active-color);
}

form:has(label[aria-label="Save"] input:checked) .loading-spinner {
  display: block;
}
\`\`\`

### ❌ Avoid:
- \`<button onclick="...">\` - Use CSS state management
- \`addEventListener\` - Use CSS :checked selectors  
- Direct DOM manipulation - Use CSS :has() queries

## 🎨 Benefits of This Pattern:
- 100-1000x faster than JavaScript
- Works without JavaScript enabled
- Native keyboard accessibility
- Secure (minimal XSS surface)
- GPU-accelerated CSS transitions
`;

    return {
      content: [
        {
          type: 'text',
          text: result
        }
      ]
    };
  }

  async getArchitecturalGuidance(question, context = '') {
    // Simple guidance based on common architectural questions
    const guidance = {
      'button': `# Button Implementation Guidance

Use the CSS-first hidden checkbox pattern:

\`\`\`html
<label role="button" aria-label="Save">
  Save
  <input type="checkbox" />
</label>
\`\`\`

**JavaScript**: Only manage \`aria-disabled\` attributes
**CSS**: Handle all visual interactions via \`:checked\` state`,

      'form': `# Form Handling Guidance

## Data Layer (JavaScript)
- Form serialization/deserialization
- API calls (POST, PUT, DELETE)
- ARIA attribute management

## UI Layer (CSS)
- Validation feedback via \`:valid\`, \`:invalid\`
- Button states via \`:has(input:checked)\`
- Loading states via CSS animations

## Pattern:
\`\`\`css
form:has([data-dirty="true"]):valid::after {
  content: '✓ Ready to submit';
}
\`\`\``,

      'navigation': `# Navigation Guidance

Use CSS-first tab switching:

\`\`\`html
<nav>
  <label><input type="radio" name="tab" />Tab 1</label>
  <label><input type="radio" name="tab" />Tab 2</label>
</nav>
<section>
  <article>Tab 1 content</article>
  <article>Tab 2 content</article>
</section>
\`\`\`

\`\`\`css
nav:has([name="tab"]:nth-of-type(1):checked) ~ section article:nth-of-type(1) {
  display: block;
}
\`\`\``,

      'default': `# D7460N Architectural Guidance

## Core Principles:
1. **CSS-First**: All UI logic in CSS via \`:has()\`, \`:checked\`, container queries
2. **JavaScript Data-Only**: Fetch, inject, CRUD operations only
3. **Progressive Enhancement**: Works without JavaScript
4. **Zero Dependencies**: No frameworks, no build tools
5. **Accessibility**: WCAG 2.1 AA compliance required

## Decision Framework:
- **Visual interaction?** → Use CSS with hidden checkboxes/radios
- **Data operation?** → Use JavaScript modules
- **State management?** → Use CSS \`:checked\` + \`:has()\`
- **Form validation?** → Use CSS \`:valid\`/\`:invalid\` + native HTML

## Questions to Ask:
- Does this work without JavaScript?
- Am I adding unnecessary JavaScript for UI?
- Could CSS handle this interaction?
- Does this maintain the zero-dependency principle?
`
    };

    const questionLower = question.toLowerCase();
    let response = guidance.default;

    for (const [key, value] of Object.entries(guidance)) {
      if (questionLower.includes(key)) {
        response = value;
        break;
      }
    }

    if (context) {
      response += `\n\n## 📋 Context Provided\n${context}\n\n## 💡 Contextual Recommendation\nBased on your context, ensure any solution maintains the CSS-first architecture and progressive enhancement principles.`;
    }

    return {
      content: [
        {
          type: 'text',
          text: response
        }
      ]
    };
  }

  async getArchitectureReminder() {
    const projectState = await fs.readFile(path.join(PROJECT_ROOT, 'docs/PROJECT-STATE.md'), 'utf-8');
    const aiInstructions = this.extractSection(projectState, '## 📝 AI ASSISTANT INSTRUCTIONS');
    
    return {
      description: 'Complete architectural context and principles reminder',
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `# D7460N Architecture Context Restoration

${aiInstructions}

## 🚨 CRITICAL REMINDERS:
1. CSS-first hidden checkbox pattern is INTENTIONAL and ADVANCED
2. Never "fix" unconventional patterns - they're performant and secure
3. JavaScript is data-layer ONLY - no UI manipulation
4. Zero dependencies - no frameworks, no build tools
5. Progressive enhancement - must work without JavaScript

**ALWAYS** validate changes against these principles before proceeding.`
          }
        }
      ]
    };
  }

  async getCSSFirstGuide() {
    return {
      description: 'Detailed guide on CSS-first hidden checkbox patterns',
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `# CSS-First Hidden Checkbox Pattern Guide

## ✅ The Correct Pattern:

\`\`\`html
<label role="button" aria-label="Save">
  Save
  <input type="checkbox" />
</label>
\`\`\`

\`\`\`css
/* Button active state */
label[role="button"]:has(input:checked) {
  background: var(--active-color);
}

/* Form submission state */
form:has(label[aria-label="Save"] input:checked) .loading-spinner {
  display: block;
}

/* Complex state combinations */
form[data-dirty="true"] label[role="button"]:not([aria-disabled]) input:checked {
  /* Ready to submit styling */
}
\`\`\`

## 🎯 Key Benefits:
- **Performance**: 100-1000x faster than JavaScript
- **Security**: Minimal XSS attack surface
- **Accessibility**: Native keyboard navigation
- **Reliability**: Works without JavaScript
- **Maintainability**: Declarative state management

## ❌ Never Do:
- Replace with \`<button onclick="...">\`
- Add \`addEventListener\` for UI interactions
- Manipulate DOM styling with JavaScript
- Break the progressive enhancement principle

## 💡 When to Use:
- Any interactive button or control
- State-dependent UI changes
- Form submission handling
- Panel show/hide logic
- Loading state management

This pattern is the foundation of D7460N architecture - embrace it!`
          }
        }
      ]
    };
  }

  async getComplianceChecklist() {
    return {
      description: 'Checklist for ensuring D7460N compliance',
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `# D7460N Compliance Checklist

## 🎨 CSS-First Principles
- [ ] All UI interactions use CSS (:has, :checked, :valid)
- [ ] No JavaScript DOM manipulation for styling
- [ ] Hidden checkbox pattern for buttons/controls
- [ ] Progressive enhancement (works without JS)

## 📱 JavaScript Constraints  
- [ ] Data operations only (fetch, CRUD, inject)
- [ ] ARIA attribute management for accessibility
- [ ] No addEventListener for UI interactions
- [ ] No style.display or classList manipulation

## 🏗️ Architecture Compliance
- [ ] Zero external dependencies
- [ ] No build tools or bundlers
- [ ] Semantic HTML structure
- [ ] CSS-only visibility logic

## ♿ Accessibility Requirements
- [ ] WCAG 2.1 AA compliance
- [ ] Native keyboard navigation
- [ ] Screen reader compatibility
- [ ] Proper ARIA attributes

## 🧪 Testing Requirements
- [ ] Functionality without JavaScript
- [ ] CSS-first pattern validation
- [ ] Cross-browser compatibility
- [ ] Performance optimization

## 📁 File Organization
- [ ] CSS in /assets/css/ (modular layers)
- [ ] JavaScript in /assets/js/ (ES6 modules)
- [ ] Data in /data/ (JSON only)
- [ ] No inline styles or scripts

## 🚀 Before Committing
- [ ] Run architectural compliance check
- [ ] Validate CSS-first patterns
- [ ] Test without JavaScript enabled
- [ ] Verify zero dependency principle
- [ ] Confirm progressive enhancement

Use this checklist before any code changes to maintain D7460N integrity!`
          }
        }
      ]
    };
  }

  extractSection(content, sectionHeader) {
    const startIndex = content.indexOf(sectionHeader);
    if (startIndex === -1) return 'Section not found';
    
    const nextHeaderIndex = content.indexOf('\n## ', startIndex + sectionHeader.length);
    const endIndex = nextHeaderIndex === -1 ? content.length : nextHeaderIndex;
    
    return content.slice(startIndex, endIndex).trim();
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('D7460N DHCP MCP Server running on stdio');
  }
}

// Start the server
const server = new D7460NMCPServer();
server.run().catch(console.error);