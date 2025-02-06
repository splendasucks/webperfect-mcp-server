export interface ImageMetadata {
  width: number;
  height: number;
  format: string;
  size: number;
  colorSpace?: string;
  hasAlpha?: boolean;
  quality?: number;
}

export interface QualityMetrics {
  noise: number;
  sharpness: number;
  compression: number;
  colorBalance: number;
  artifacts: number;
}

export interface ProcessingParameters {
  maxWidth?: number;
  maxHeight?: number;
  format?: string;
  quality?: number;
  compressionLevel?: number;
  preserveMetadata?: boolean;
}

export interface Operation {
  type: 'noise_reduction' | 'auto_levels' | 'texture_enhancement' | 'resize' | 'format_conversion';
  parameters: Record<string, any>;
}

export interface EnhancementPlan {
  operations: Operation[];
  parameters: ProcessingParameters;
  quality: QualityMetrics;
}

export interface ProcessingStats {
  inputSize: number;
  outputSize: number;
  processingTime: number;
  compressionRatio: number;
  qualityScore: number;
  operations: string[];
}

export interface ProcessingResult {
  image: Buffer;
  metadata: ImageMetadata;
  metrics: QualityMetrics;
  stats: ProcessingStats;
}

export interface PipelineStage {
  name: string;
  execute: (input: any) => Promise<any>;
  validate?: (input: any) => Promise<boolean>;
  cleanup?: () => Promise<void>;
}

export interface PipelineContext {
  originalImage: Buffer;
  processedImage?: Buffer;
  metadata?: ImageMetadata;
  metrics?: QualityMetrics;
  plan?: EnhancementPlan;
  stats?: ProcessingStats;
  error?: Error;
}