# D7460N DHCP MCP Server

## Overview

This Model Context Protocol (MCP) server provides intelligent context management and architectural compliance checking for the D7460N DHCP project. It helps AI assistants maintain focus, remember architectural principles, and ensure consistency throughout development sessions.

## Features

### 🧠 Context Management
- **Full context restoration** from project documentation
- **Focused area guidance** for specific architectural concerns
- **Progress tracking** across development sessions
- **Task continuity** to prevent losing focus mid-session

### 🏗️ Architectural Compliance
- **Real-time compliance checking** for file changes
- **CSS-first pattern validation** with specific guidance
- **Zero-dependency principle enforcement**
- **Progressive enhancement verification**

### 🎯 Focus Maintenance
- **Task progress tracking** with status updates
- **Architectural principle reminders** on demand
- **Pattern-specific guidance** for common scenarios
- **Compliance scoring** for code changes

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- MCP-compatible AI assistant (Claude Desktop, etc.)

### Installation

1. **Install dependencies:**
   ```bash
   cd mcp-server
   npm install
   ```

2. **Test the server:**
   ```bash
   npm start
   ```

3. **Configure your MCP client** (e.g., Claude Desktop) to use this server.

### MCP Client Configuration

Add to your MCP client configuration:

```json
{
  "mcpServers": {
    "d7460n-dhcp": {
      "command": "node",
      "args": ["path/to/DHCP/mcp-server/index.js"],
      "cwd": "path/to/DHCP"
    }
  }
}
```

## Available Tools

### 🔄 `restore_context`
Restore full project context from documentation and current state.

**Parameters:**
- `focus_area` (optional): Specific area to focus on
  - `css-first-patterns`: Deep dive into CSS-first architecture
  - `form-handling`: Form state management guidance  
  - `api-integration`: Data layer and API patterns
  - `architecture-overview`: General architectural context
  - `current-issues`: Current project status and issues

**Example:**
```javascript
// Restore context with CSS-first pattern focus
restore_context({ focus_area: "css-first-patterns" })
```

### ✅ `check_architectural_compliance`
Validate that code changes comply with D7460N architecture principles.

**Parameters:**
- `file_path` (required): Path to file to check
- `change_description` (optional): Description of changes being made

**Example:**
```javascript
check_architectural_compliance({ 
  file_path: "assets/js/forms.js",
  change_description: "Added new form submission handler"
})
```

### 📊 `track_progress`
Track progress on current task and maintain focus.

**Parameters:**
- `task_description` (required): Description of the current task
- `status` (required): `started`, `in_progress`, `completed`, or `blocked`
- `notes` (optional): Additional context or notes

**Example:**
```javascript
track_progress({
  task_description: "Implement CSS-first modal dialog",
  status: "in_progress",
  notes: "Hidden checkbox pattern implemented, working on CSS state management"
})
```

### 🎨 `validate_css_first_pattern`
Specifically validate CSS-first hidden checkbox patterns.

**Parameters:**
- `html_snippet` (optional): HTML code to validate
- `css_snippet` (optional): Related CSS code

**Example:**
```javascript
validate_css_first_pattern({
  html_snippet: `<label role="button" aria-label="Save">
    Save
    <input type="checkbox" />
  </label>`,
  css_snippet: `label[role="button"]:has(input:checked) { background: blue; }`
})
```

### 🤖 `get_architectural_guidance`
Get specific guidance on D7460N architectural decisions.

**Parameters:**
- `question` (required): Specific architectural question
- `context` (optional): Additional context about the situation

**Example:**
```javascript
get_architectural_guidance({
  question: "How should I implement a collapsible panel?",
  context: "Need to show/hide content based on user interaction"
})
```

## Available Prompts

### 🏗️ `architecture_reminder`
Complete architectural context and principles reminder for immediate orientation.

### 🎨 `css_first_guide`  
Detailed guide on CSS-first hidden checkbox patterns with examples and best practices.

### ✅ `compliance_checklist`
Comprehensive checklist for ensuring D7460N architectural compliance before making changes.

## Available Resources

### 📖 Documentation Access
- `file://docs/PROJECT-STATE.md`: Complete project context and current status
- `file://AGENT.md`: Universal agent configuration and guidelines  
- `file://AGENTS.md`: Detailed agent instructions and conventions

## Usage Examples

### Starting a New Development Session

1. **Restore context:**
   ```javascript
   restore_context({ focus_area: "architecture-overview" })
   ```

2. **Get compliance checklist:**
   ```javascript
   // Use the compliance_checklist prompt
   ```

3. **Track your task:**
   ```javascript
   track_progress({
     task_description: "Fix form validation CSS patterns", 
     status: "started"
   })
   ```

### Before Making Code Changes

1. **Check current compliance:**
   ```javascript
   check_architectural_compliance({ 
     file_path: "assets/css/forms.css"
   })
   ```

2. **Get specific guidance:**
   ```javascript
   get_architectural_guidance({
     question: "form validation patterns",
     context: "Need to show validation errors without JavaScript"
   })
   ```

### After Making Changes

1. **Validate patterns:**
   ```javascript
   validate_css_first_pattern({
     html_snippet: "<!-- your new HTML -->",
     css_snippet: "/* your new CSS */"
   })
   ```

2. **Update progress:**
   ```javascript
   track_progress({
     task_description: "Fix form validation CSS patterns",
     status: "completed",
     notes: "Successfully implemented CSS-only validation feedback"
   })
   ```

## Key Benefits

### 🎯 **Maintain Focus**
- Prevents forgetting architectural principles mid-session
- Tracks progress to avoid losing context
- Provides task continuity across interruptions

### 🏗️ **Enforce Architecture**
- Real-time compliance checking prevents violations
- Pattern-specific validation ensures consistency
- Architectural guidance for complex decisions

### 📚 **Context Preservation**
- Instant access to comprehensive project documentation
- Focused guidance based on current needs
- Progress tracking maintains development continuity

### 🚀 **Accelerate Development**
- Reduces time spent re-reading documentation
- Prevents architectural mistakes before they happen
- Provides immediate guidance for complex patterns

## Architecture Principles Enforced

### 🎨 CSS-First State Management
- Hidden checkbox patterns for all interactive elements
- CSS `:has()` and `:checked` selectors for state logic
- No JavaScript DOM manipulation for UI

### 📱 Minimal JavaScript
- Data layer operations only (fetch, CRUD, inject)
- ARIA attribute management for accessibility
- No event listeners for UI interactions

### 🌐 Progressive Enhancement
- Full functionality without JavaScript
- Semantic HTML structure
- CSS-only visibility and interaction logic

### 🛡️ Zero Dependencies
- No external frameworks or libraries
- No build tools or bundlers
- Browser-native solutions only

## Development

### Running in Development Mode
```bash
npm run dev  # Uses --watch flag for auto-restart
```

### Testing
The server provides immediate feedback through its compliance checking and validation tools. Test by:

1. Running `restore_context` to verify documentation access
2. Testing `check_architectural_compliance` on existing files
3. Validating `css_first_pattern` with known good/bad examples

### Contributing

When extending the MCP server:

1. **Maintain architectural compliance** - the server itself should follow D7460N principles where applicable
2. **Focus on guidance, not enforcement** - provide helpful feedback rather than blocking operations
3. **Preserve context** - ensure all tools maintain and enhance context rather than losing it
4. **Document patterns** - add new architectural patterns to guidance tools

## Troubleshooting

### Server Not Starting
- Verify Node.js 18+ is installed
- Check that all dependencies are installed (`npm install`)
- Ensure MCP SDK is compatible version

### Tools Not Working
- Verify project paths are correct relative to repository root
- Check that documentation files exist and are readable
- Ensure MCP client configuration points to correct server location

### Context Not Restored
- Verify `docs/PROJECT-STATE.md` and other documentation files exist
- Check file permissions for read access
- Ensure server has access to project root directory

## License

MIT License - Same as the main D7460N DHCP project.