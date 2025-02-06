#!/usr/bin/env bun
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
	console.log("🚀 Starting WebPerfect MCP Server test client...");

	// Start the server process
	console.log("📡 Spawning server process...");
	const serverProcess = spawn(
		"bun",
		[path.join(__dirname, "../build/index.js")],
		{
			stdio: ["pipe", "pipe", process.stderr],
		}
	);

	// Wait for server to initialize
	console.log("⏳ Waiting for server initialization...");
	await sleep(1000);

	// Create MCP client with capabilities
	const client = new Client(
		new StdioClientTransport(serverProcess.stdout, serverProcess.stdin),
		{
			capabilities: {
				tools: true,
				resources: true,
			},
		}
	);

	try {
		// Initialize connection
		console.log("🤝 Initializing MCP client connection...");
		await client.initialize();

		// List available tools
		console.log("\n📦 Available tools:");
		const tools = await client.listTools();
		console.log(JSON.stringify(tools, null, 2));

		// List available resources
		console.log("\n📚 Available resources:");
		const resources = await client.listResources();
		console.log(JSON.stringify(resources, null, 2));

		// Process test image
		console.log("\n🖼️  Processing test images...");
		const result = await client.callTool("process_images", {
			inputDir: path.join(__dirname, "input"),
			outputDir: path.join(__dirname, "output"),
		});
		console.log("✨ Processing result:", JSON.stringify(result, null, 2));

		// Access some resources
		console.log("\n📊 Fetching processing statistics...");
		const stats = await client.getResource("stats/summary");
		console.log(JSON.stringify(stats, null, 2));
	} catch (error) {
		console.error("❌ Error:", error.message);
		if (error.stack) {
			console.error("\nStack trace:", error.stack);
		}
	} finally {
		// Clean up
		console.log("\n🧹 Cleaning up...");
		serverProcess.kill();
		console.log("✅ Test complete!");
	}
}

main().catch((error) => {
	console.error("💥 Fatal error:", error);
	process.exit(1);
});
