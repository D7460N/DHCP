# MCP Server Configuration Examples

This directory contains example configurations for various MCP clients to use the D7460N DHCP MCP Server.

## Claude Desktop Configuration

Add to your Claude Desktop `claude_desktop_config.json`:

```json
{
  "globalShortcut": "Cmd+Shift+Space",
  "mcpServers": {
    "d7460n-dhcp": {
      "command": "node",
      "args": ["/absolute/path/to/DHCP/mcp-server/index.js"],
      "cwd": "/absolute/path/to/DHCP",
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

### macOS Configuration Location
```bash
~/Library/Application Support/Claude/claude_desktop_config.json
```

### Windows Configuration Location
```bash
%APPDATA%\Claude\claude_desktop_config.json
```

### Linux Configuration Location
```bash
~/.config/Claude/claude_desktop_config.json
```

## VS Code with Continue Extension

Add to your Continue `config.json`:

```json
{
  "models": [...],
  "mcpServers": [
    {
      "name": "d7460n-dhcp",
      "command": "node",
      "args": ["/absolute/path/to/DHCP/mcp-server/index.js"],
      "cwd": "/absolute/path/to/DHCP"
    }
  ]
}
```

## Custom MCP Client

For any MCP-compatible client, use these connection parameters:

```javascript
// Node.js example
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';

const transport = new StdioClientTransport({
  command: 'node',
  args: ['/absolute/path/to/DHCP/mcp-server/index.js'],
  cwd: '/absolute/path/to/DHCP'
});

const client = new Client({
  name: 'd7460n-dhcp-client',
  version: '1.0.0'
}, {
  capabilities: {}
});

await client.connect(transport);
```

## Environment Variables

The MCP server supports these optional environment variables:

```bash
# Set project root (defaults to parent directory of mcp-server)
PROJECT_ROOT=/path/to/DHCP

# Set log level for debugging
LOG_LEVEL=debug

# Enable/disable specific features
ENABLE_COMPLIANCE_CHECKING=true
ENABLE_PROGRESS_TRACKING=true
```

## Development Configuration

For development with auto-restart:

```json
{
  "mcpServers": {
    "d7460n-dhcp-dev": {
      "command": "npm",
      "args": ["run", "dev"],
      "cwd": "/absolute/path/to/DHCP/mcp-server",
      "env": {
        "NODE_ENV": "development",
        "LOG_LEVEL": "debug"
      }
    }
  }
}
```

## Testing Configuration

To test the MCP server connection:

1. **Start the server manually:**
   ```bash
   cd /path/to/DHCP/mcp-server
   npm start
   ```

2. **Test with MCP Inspector (if available):**
   ```bash
   npx @modelcontextprotocol/inspector node index.js
   ```

3. **Verify tools are available:**
   ```bash
   # The server should respond to MCP protocol messages
   # Check console output for "D7460N DHCP MCP Server running on stdio"
   ```

## Troubleshooting

### Common Issues

1. **Server not found:**
   - Verify absolute paths are correct
   - Check that Node.js is in PATH
   - Ensure mcp-server directory exists

2. **Permission errors:**
   - Check file permissions on server files
   - Verify read access to documentation files
   - Ensure write access for progress tracking

3. **Tool calls failing:**
   - Verify PROJECT_ROOT environment variable
   - Check that documentation files exist
   - Ensure proper JSON response format

### Debug Mode

Enable debug logging:

```json
{
  "mcpServers": {
    "d7460n-dhcp": {
      "command": "node",
      "args": ["/path/to/DHCP/mcp-server/index.js"],
      "cwd": "/path/to/DHCP",
      "env": {
        "LOG_LEVEL": "debug",
        "NODE_ENV": "development"
      }
    }
  }
}
```

### Validation

After configuration, test that the server is working:

1. **Try restoring context:**
   ```
   Use the restore_context tool with focus_area: "architecture-overview"
   ```

2. **Check architectural compliance:**
   ```
   Use check_architectural_compliance with file_path: "index.html"
   ```

3. **Validate patterns:**
   ```
   Use validate_css_first_pattern with sample HTML/CSS
   ```

If all tools respond correctly, the MCP server is properly configured and connected.