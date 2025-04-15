import fs from 'fs';
import path from 'path';

const TARGET_DIRECTORIES = [
  '../mobile/components',
  '../mobile/components/containers',
  '../mobile/components/controls',
  '../mobile/components/form',
  '../mobile/components/layout',
  '../mobile/components/module',
  '../mobile/components/presentational',
  '../mobile/context',
  '../mobile/hooks',
  '../mobile/navigation',
  '../mobile/utils',
];

const NAMED_EXPORT_DIRS = ['hooks', 'utils', 'context'];
// Customize this if you want to ignore files like test specs, stories, etc.
const IGNORED_PATTERNS = ['.test.', '.spec.', '.stories.'];

/**
 * Determine if file should be included in barrel
 */
function isValidExportFile(file: string): boolean {
  return (
    file !== 'index.ts' &&
    (file.endsWith('.ts') || file.endsWith('.tsx')) &&
    !IGNORED_PATTERNS.some(pattern => file.includes(pattern))
  );
}

function usesDefaultExport(filePath: string): boolean {
  const content = fs.readFileSync(filePath, 'utf8');
  return content.includes('export default');
}

function getExportStatements(directory: string, files: string[], useNamedExport: boolean): string {
  return files
    .map(file => {
      const name = path.basename(file, path.extname(file));
      const filePath = path.join(directory, file);

      if (useNamedExport || !usesDefaultExport(filePath)) {
        return `export * from "./${name}";`;
      }

      return `export { default as ${name} } from "./${name}";`;
    })
    .join('\n');
}

function generateBarrel(directory: string): void {
  const files = fs.readdirSync(directory).filter(isValidExportFile);
  if (files.length === 0) return;

  const folderName = path.basename(directory);
  const useNamedExport = NAMED_EXPORT_DIRS.includes(folderName);

  const content = getExportStatements(directory, files, useNamedExport);
  const indexPath = path.join(directory, 'index.ts');

  fs.writeFileSync(indexPath, content + '\n');
  console.log(`✅ Barrel created at: ${path.relative(process.cwd(), indexPath)}`);
}

function run(): void {
  for (const dir of TARGET_DIRECTORIES) {
    const fullPath = path.resolve(__dirname, '..', dir);
    if (fs.existsSync(fullPath)) {
      generateBarrel(fullPath);
    } else {
      console.warn(`⚠️ Directory not found: ${fullPath}`);
    }
  }
}

run();
