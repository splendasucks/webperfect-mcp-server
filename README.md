# WebPerfect MCP Server

A high-performance Model Context Protocol (MCP) server that provides advanced image processing capabilities optimized for web delivery. Built with modern web standards in mind, it offers a sophisticated pipeline that automatically enhances, optimizes, and converts images for optimal web performance.

## Overview

WebPerfect MCP Server addresses common challenges in web image optimization:

- Large file sizes impacting page load times
- Inconsistent image quality across different sources
- Manual optimization bottlenecks in development workflows
- Complex balance between quality and compression
- Lack of modern format adoption (WebP, AVIF)

### Key Benefits

- 🚀 Fully automated optimization pipeline
- 📊 Up to 80% file size reduction without visible quality loss
- 🎨 Intelligent enhancement of image quality
- ⚡️ Batch processing for high throughput
- 📱 Responsive-ready with smart resizing
- 🔄 Modern format conversion (WebP)
- 📈 Detailed processing statistics and logs

## Technical Architecture

### Advanced Image Processing Pipeline

1. **Noise Reduction**
   - Median filtering for artifact removal
   - Smart threshold detection
   - Preservation of important details

2. **Quality Enhancement**
   - Entropy-based auto levels adjustment
   - Dynamic curve optimization
   - Shadow and highlight recovery

3. **Texture Processing**
   - Advanced texture preservation
   - Adaptive sharpening
   - Detail modulation

4. **Resolution Optimization**
   - Smart downscaling up to 4K
   - Aspect ratio preservation
   - Multiple size variants

5. **Format Conversion**
   - WebP optimization
   - Quality-size balancing
   - Metadata preservation

### Tools

#### `process_images`

Process and optimize a batch of images with advanced enhancements.

```typescript
interface ProcessImagesParams {
  inputDir: string;      // Directory containing input images
  outputDir: string;     // Directory for optimized output
  options?: {
    preset?: "web_standard" | "web_high_quality" | "thumbnail";
    maxWidth?: number;   // Override preset max width
    quality?: number;    // Override preset quality (1-100)
    format?: "webp" | "jpeg" | "png"; // Override preset format
  }
}
```

### Resources

#### Dynamic Resources

##### `logs/{date}`

Access daily processing logs (YYYY-MM-DD format)

```typescript
interface DailyLog {
  date: string;
  entries: Array<{
    timestamp: string;
    imagesProcessed: number;
    totalInputSize: string;
    totalOutputSize: string;
    compressionRatio: string;
    averageProcessingTime: string;
  }>;
}
```

##### `stats/monthly/{month}`

Monthly processing statistics (YYYY-MM format)

```typescript
interface MonthlyStats {
  month: string;
  totalImagesProcessed: number;
  averageCompressionRatio: string;
  popularFormats: {
    input: string[];
    output: string[];
  };
  totalStorageSaved: string;
}
```

#### Static Resources

##### `stats/summary`

Overall processing statistics

```typescript
interface ProcessingStats {
  totalImagesProcessed: number;
  averageCompressionRatio: string;
  totalStorageSaved: string;
  popularEnhancements: string[];
  performanceMetrics: {
    averageProcessingTime: string;
    peakThroughput: string;
  };
}
```

##### `config/optimization-presets`

Available optimization presets

```typescript
interface OptimizationPresets {
  presets: {
    web_standard: PresetConfig;
    web_high_quality: PresetConfig;
    thumbnail: PresetConfig;
  };
}

interface PresetConfig {
  maxWidth: number;
  format: string;
  quality: number;
  enhancements: string[];
}
```

## Getting Started

### Prerequisites

- Bun >= 1.0.0
- Sharp image processing library
- Model Context Protocol SDK

### Installation

1. Clone the repository:

```bash
git clone https://github.com/splendasucks/webperfect-mcp-server.git
cd webperfect-mcp-server
```

2. Install dependencies:

```bash
bun install
```

3. Build the server:

```bash
bun run build
```

### Testing

The repository includes a test client (`test/test_client.mjs`) that demonstrates server functionality:

```bash
# Run the test client
bun test/test_client.mjs
```

The test client:

- Starts the server process
- Connects via MCP
- Lists available tools and resources
- Processes sample images
- Retrieves processing statistics

### Integration with Claude

1. Add the server to your Claude MCP settings (typically in `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "webperfect": {
      "command": "bun",
      "args": ["/path/to/webperfect-mcp-server/build/index.js"],
      "env": {}
    }
  }
}
```

2. Restart Claude to load the MCP server.

3. Use the server through Claude's MCP interface:

```typescript
// Process a batch of images
<use_mcp_tool>
<server_name>webperfect</server_name>
<tool_name>process_images</tool_name>
<arguments>
{
  "inputDir": "/path/to/input",
  "outputDir": "/path/to/output",
  "options": {
    "preset": "web_standard"
  }
}
</arguments>
</use_mcp_tool>

// Access processing statistics
<access_mcp_resource>
<server_name>webperfect</server_name>
<uri>stats/summary</uri>
</access_mcp_resource>
```

## Development

### Project Structure

```
webperfect-mcp-server/
├── src/                    # Source code
│   ├── index.ts           # Server entry point
│   ├── tools/             # MCP tools implementation
│   ├── resources/         # MCP resources implementation
│   └── processing/        # Image processing pipeline
├── test/                  # Test files
│   ├── test_client.mjs    # MCP client test script
│   ├── input/            # Test input images
│   └── output/           # Test output directory
└── build/                 # Compiled JavaScript
```

### Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT

## Support

For issues and feature requests, please use the GitHub issue tracker.
