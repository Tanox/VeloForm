/**
 * Schema validation for shareable configuration links.
 * Prevents prototype pollution and injection attacks from URL parameters.
 */

import { z } from 'zod';
import type { BikeType, ConfigComponent } from '@/types';

/** Allowed bike types enum */
const BikeTypeEnum = z.enum(['Road', 'MTB', 'Fold']);

/** Allowed component categories enum */
const ComponentCategoryEnum = z.enum([
  'Frame',
  'Drivetrain',
  'Wheelset',
  'Suspension',
  'Cockpit',
  'Tires',
]);

/** Component specs schema - allows any shape but validates types */
const ComponentSpecsSchema: z.ZodType<Record<string, unknown>> = z.record(z.string(), z.unknown());

/** Individual component schema */
const ComponentSchema = z.object({
  id: z.string().min(1).max(100),
  name: z.string().min(1).max(200),
  category: ComponentCategoryEnum,
  bikeType: BikeTypeEnum,
  price: z.number().int().min(0).max(1_000_000),
  weight: z.number().int().min(0).max(100_000),
  brand: z.string().max(100).optional(),
  model: z.string().max(100).optional(),
  description: z.string().max(500).optional(),
  rating: z.number().min(0).max(5).optional(),
  reviewCount: z.number().int().min(0).max(100_000).optional(),
  imageUrl: z.string().url().optional(),
  specs: ComponentSpecsSchema.optional(),
});

/**
 * Schema for parsed shareable configuration.
 * Used to validate ?config= URL parameter after base64 decode + JSON parse.
 */
export const ShareableConfigSchema = z.object({
  bikeType: BikeTypeEnum,
  name: z.string().min(1).max(200),
  components: z.array(ComponentSchema).min(0).max(50),
});

export type ShareableConfig = z.infer<typeof ShareableConfigSchema>;

/** Validation result type */
export interface ValidationResult {
  valid: boolean;
  data?: ShareableConfig;
  error?: string;
}

/**
 * Parse and validate a base64-encoded config string from URL.
 * Returns parsed data if valid, or error message if invalid.
 */
export function parseShareableConfig(encoded: string): ValidationResult {
  try {
    // Step 1: Base64 decode
    let decoded: string;
    try {
      decoded = atob(encoded);
    } catch {
      return { valid: false, error: 'Invalid base64 encoding' };
    }

    // Step 2: JSON parse with try-catch
    let parsed: unknown;
    try {
      parsed = JSON.parse(decoded);
    } catch {
      return { valid: false, error: 'Invalid JSON format' };
    }

    // Step 3: Zod schema validation
    const result = ShareableConfigSchema.safeParse(parsed);

    if (!result.success) {
      const issues = result.error.issues.map((i) => i.message).join('; ');
      return { valid: false, error: `Validation failed: ${issues}` };
    }

    return { valid: true, data: result.data };
  } catch (err) {
    return {
      valid: false,
      error: err instanceof Error ? err.message : 'Unknown parsing error',
    };
  }
}

/**
 * Encode a configuration object to base64 for sharing.
 */
export function encodeShareableConfig(
  bikeType: BikeType,
  components: ConfigComponent[],
  name: string
): string {
  const config: ShareableConfig = {
    bikeType,
    name,
    components: components.map((comp) => ({
      id: comp.id,
      name: comp.name,
      category: comp.category,
      bikeType: comp.bikeType,
      price: comp.price,
      weight: comp.weight,
      brand: comp.brand,
      model: comp.model,
      description: comp.description,
      rating: comp.rating,
      reviewCount: comp.reviewCount,
      imageUrl: comp.imageUrl,
      // Cast specs to generic Record to satisfy schema
      specs: comp.specs as Record<string, unknown> | undefined,
    })),
  };

  return btoa(JSON.stringify(config));
}

/**
 * Generate a safe shareable link from configuration data.
 */
export function generateShareableLink(
  bikeType: BikeType,
  components: ConfigComponent[],
  name: string
): string {
  const encoded = encodeShareableConfig(bikeType, components, name);
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return `${origin}/?config=${encoded}`;
}
