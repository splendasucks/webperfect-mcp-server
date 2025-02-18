import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import path from "path";
import { promises as fs } from "fs";
import sharp from "sharp";
import { ImageProcessorServer } from "../src/index";

const TEST_INPUT_DIR = path.join(__dirname, "fixtures", "input");
const TEST_OUTPUT_DIR = path.join(__dirname, "fixtures", "output");

describe("ImageProcessorServer", () => {
	beforeAll(async () => {
		// Create test directories
		await fs.mkdir(TEST_INPUT_DIR, { recursive: true });
		await fs.mkdir(TEST_OUTPUT_DIR, { recursive: true });

		// Create a test image
		const testImage = sharp({
			create: {
				width: 1920,
				height: 1080,
				channels: 3,
				background: { r: 255, g: 255, b: 255 },
			},
		});

		await testImage.jpeg().toFile(path.join(TEST_INPUT_DIR, "test.jpg"));
	});

	afterAll(async () => {
		// Clean up test directories
		await fs.rm(TEST_INPUT_DIR, { recursive: true, force: true });
		await fs.rm(TEST_OUTPUT_DIR, { recursive: true, force: true });
	});

	it("should process images and generate WebP output", async () => {
		const server = new ImageProcessorServer();

		const result = await server.processImages({
			inputDir: TEST_INPUT_DIR,
			outputDir: TEST_OUTPUT_DIR,
		});

		// Verify the result structure
		expect(result).toBeDefined();
		expect(result.totalFiles).toBeGreaterThan(0);

		// Check if output files exist
		const outputFiles = await fs.readdir(TEST_OUTPUT_DIR);
		expect(outputFiles).toContain("test.webp");
		expect(outputFiles).toContain("processing-log.json");

		// Verify the output image
		const outputImage = await sharp(
			path.join(TEST_OUTPUT_DIR, "test.webp")
		).metadata();
		expect(outputImage.format).toBe("webp");
		expect(outputImage.width).toBeLessThanOrEqual(3840);
	});

	it("should handle invalid input gracefully", async () => {
		const server = new ImageProcessorServer();

		await expect(
			server.processImages({
				inputDir: "/nonexistent/directory",
				outputDir: TEST_OUTPUT_DIR,
			})
		).rejects.toThrow();
	});
});
