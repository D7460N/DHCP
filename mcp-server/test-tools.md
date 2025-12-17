# Test the MCP server tools

This script tests the basic functionality of the D7460N DHCP MCP Server.

## Manual Testing

You can test the server by running it and sending MCP protocol messages. Here are some example tool calls:

### 1. Test Context Restoration

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "restore_context",
    "arguments": {
      "focus_area": "css-first-patterns"
    }
  }
}
```

### 2. Test Architectural Compliance Check

```json
{
  "jsonrpc": "2.0", 
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "check_architectural_compliance",
    "arguments": {
      "file_path": "index.html",
      "change_description": "Added new form button"
    }
  }
}
```

### 3. Test CSS-First Pattern Validation

```json
{
  "jsonrpc": "2.0",
  "id": 3, 
  "method": "tools/call",
  "params": {
    "name": "validate_css_first_pattern",
    "arguments": {
      "html_snippet": "<label role=\"button\" aria-label=\"Save\">Save<input type=\"checkbox\" /></label>",
      "css_snippet": "label[role=\"button\"]:has(input:checked) { background: blue; }"
    }
  }
}
```

### 4. Test Progress Tracking

```json
{
  "jsonrpc": "2.0",
  "id": 4,
  "method": "tools/call", 
  "params": {
    "name": "track_progress",
    "arguments": {
      "task_description": "Testing MCP server functionality",
      "status": "in_progress",
      "notes": "Validating all tools work correctly"
    }
  }
}
```

### 5. Test Architectural Guidance

```json
{
  "jsonrpc": "2.0",
  "id": 5,
  "method": "tools/call",
  "params": {
    "name": "get_architectural_guidance", 
    "arguments": {
      "question": "How should I implement form validation?",
      "context": "Need to show validation errors without JavaScript"
    }
  }
}
```

## Expected Results

When the server is working correctly:

1. **restore_context** should return comprehensive project context
2. **check_architectural_compliance** should analyze files and provide compliance scores
3. **validate_css_first_pattern** should validate patterns and provide feedback
4. **track_progress** should update progress tracking state
5. **get_architectural_guidance** should provide relevant architectural advice

## Troubleshooting

If tools aren't working:

1. Check that the server started without errors
2. Verify the PROJECT_ROOT path is correct
3. Ensure documentation files exist and are readable
4. Check the console for any error messages

## Integration Testing

To test with an actual MCP client:

1. Configure your MCP client (Claude Desktop, VS Code, etc.)
2. Start a conversation and try using the tools
3. Verify that context is maintained across tool calls
4. Test that architectural guidance is helpful and accurate