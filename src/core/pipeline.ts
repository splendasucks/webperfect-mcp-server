import { PipelineStage, PipelineContext } from './types';

export class Pipeline {
  private stages: PipelineStage[] = [];

  constructor() {}

  addStage(stage: PipelineStage): Pipeline {
    this.stages.push(stage);
    return this;
  }

  async execute(initialContext: PipelineContext): Promise<PipelineContext> {
    let context = { ...initialContext };

    try {
      for (const stage of this.stages) {
        try {
          // Validate stage input if validator exists
          if (stage.validate) {
            const isValid = await stage.validate(context);
            if (!isValid) {
              throw new Error(`Validation failed for stage: ${stage.name}`);
            }
          }

          // Execute the stage
          const result = await stage.execute(context);
          context = { ...context, ...result };

        } catch (error) {
          console.error(`Error in pipeline stage ${stage.name}:`, error);
          context.error = error as Error;
          break;
        }
      }

      // Cleanup stages
      await this.cleanup();

    } catch (error) {
      console.error('Pipeline execution failed:', error);
      context.error = error as Error;
    }

    return context;
  }

  private async cleanup(): Promise<void> {
    for (const stage of this.stages) {
      if (stage.cleanup) {
        try {
          await stage.cleanup();
        } catch (error) {
          console.error(`Cleanup failed for stage ${stage.name}:`, error);
        }
      }
    }
  }
}

export class PipelineBuilder {
  private pipeline: Pipeline;

  constructor() {
    this.pipeline = new Pipeline();
  }

  addAnalysisStage(stage: PipelineStage): PipelineBuilder {
    this.pipeline.addStage({
      ...stage,
      name: `analysis:${stage.name}`
    });
    return this;
  }

  addEnhancementStage(stage: PipelineStage): PipelineBuilder {
    this.pipeline.addStage({
      ...stage,
      name: `enhancement:${stage.name}`
    });
    return this;
  }

  addProcessingStage(stage: PipelineStage): PipelineBuilder {
    this.pipeline.addStage({
      ...stage,
      name: `processing:${stage.name}`
    });
    return this;
  }

  addVerificationStage(stage: PipelineStage): PipelineBuilder {
    this.pipeline.addStage({
      ...stage,
      name: `verification:${stage.name}`
    });
    return this;
  }

  build(): Pipeline {
    if (this.pipeline['stages'].length === 0) {
      throw new Error('Pipeline must contain at least one stage');
    }
    return this.pipeline;
  }
}