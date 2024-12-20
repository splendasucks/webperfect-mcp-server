<div align="center">

# 🎨 WebPerfect MCP Server

> Transform your images into web-optimized masterpieces with AI-powered precision

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16-brightgreen)](https://nodejs.org)
[![Sharp](https://img.shields.io/badge/sharp-latest-blue)](https://sharp.pixelplumbing.com)

</div>

---

## ✨ Overview

WebPerfect is a cutting-edge MCP server that revolutionizes image optimization for the web. Using advanced AI algorithms and sophisticated processing techniques, it automatically enhances your images while dramatically reducing file sizes - all without compromising visual quality.

### 🚀 Key Benefits

- **Intelligent Processing**: AI-powered algorithms adapt to each image's unique characteristics
- **Superior Quality**: Enhanced visual clarity with smart sharpening and noise reduction
- **Maximum Compression**: Achieve up to 80% size reduction while preserving image quality
- **Batch Automation**: Process entire directories with a single command
- **Web Optimized**: Perfect for modern web applications and responsive designs

## 🛠 Features

### 🔄 Advanced Image Processing Pipeline
1. Strong noise reduction using median filtering
2. Intelligent auto levels and curves based on image entropy
3. Advanced texture enhancement with modulation and sharpening
4. Smart resolution optimization (up to 4K)
5. Optimized WebP conversion

### 🔧 Tools

#### 📦 `process_images`
Effortlessly process and optimize entire image collections with our advanced enhancement pipeline.
```typescript
{
  inputDir: string;      // Directory containing input images
  outputDir: string;     // Directory for optimized output
}
```

### 📊 Resources

#### 📈 Resource Templates
- `logs/{date}`: Access processing logs by date (YYYY-MM-DD)
  ```json
  {
    "date": "2024-01-20",
    "entries": [{
      "timestamp": "2024-01-20T10:00:00Z",
      "imagesProcessed": 15,
      "totalInputSize": "5.2MB",
      "totalOutputSize": "1.1MB",
      "compressionRatio": "78.8%",
      "averageProcessingTime": "1.2s"
    }]
  }
  ```

- `stats/monthly/{month}`: Monthly statistics (YYYY-MM)
  ```json
  {
    "month": "2024-01",
    "totalImagesProcessed": 450,
    "averageCompressionRatio": "82%",
    "popularFormats": {
      "input": ["JPEG", "PNG"],
      "output": ["WebP"]
    },
    "totalStorageSaved": "150MB"
  }
  ```

#### Static Resources
- `stats/summary`: Overall processing statistics
  ```json
  {
    "totalImagesProcessed": 5280,
    "averageCompressionRatio": "81%",
    "totalStorageSaved": "1.8GB",
    "popularEnhancements": [
      "noise_reduction",
      "auto_levels_curves",
      "texture_enhancement"
    ],
    "performanceMetrics": {
      "averageProcessingTime": "1.5s",
      "peakThroughput": "45 images/minute"
    }
  }
  ```

- `config/optimization-presets`: Available optimization presets
  ```json
  {
    "presets": {
      "web_standard": {
        "maxWidth": 1920,
        "format": "webp",
        "quality": 85,
        "enhancements": ["noise_reduction", "auto_levels_curves"]
      },
      "web_high_quality": {
        "maxWidth": 3840,
        "format": "webp",
        "quality": 90,
        "enhancements": [
          "noise_reduction",
          "auto_levels_curves",
          "texture_enhancement"
        ]
      },
      "thumbnail": {
        "maxWidth": 400,
        "format": "webp",
        "quality": 80,
        "enhancements": ["noise_reduction"]
      }
    }
  }
  ```

## 🚀 Getting Started

### 📥 Installation

1. Clone the repository:
```bash
git clone https://github.com/splendasucks/webperfect-mcp-server.git
cd webperfect-mcp-server
```

2. Install dependencies:
```bash
npm install
```

3. Build the server:
```bash
npm run build
```

## 🤖 Usage with Claude

1. Add the server to your Claude MCP settings (typically in `claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "webperfect": {
      "command": "node",
      "args": ["/path/to/webperfect-mcp-server/build/index.js"],
      "env": {}
    }
  }
}
```

2. Restart Claude to load the MCP server.

3. The server will be available through Claude's MCP tools and resources:
```typescript
// Process a batch of images
<use_mcp_tool>
<server_name>webperfect</server_name>
<tool_name>process_images</tool_name>
<arguments>
{
  "inputDir": "/path/to/input",
  "outputDir": "/path/to/output"
}
</arguments>
</use_mcp_tool>

// Access processing statistics
<access_mcp_resource>
<server_name>webperfect</server_name>
<uri>stats/summary</uri>
</access_mcp_resource>
```

## 📋 Requirements

- 📦 Node.js >= 16
- 🖼️ Sharp image processing library
- 🔌 Model Context Protocol SDK

## 📄 License

[MIT](LICENSE) © 2024 WebPerfect Contributors
