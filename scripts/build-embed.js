const esbuild = require('esbuild');
const path = require('path');

async function build() {
  try {
    await esbuild.build({
      entryPoints: [path.resolve(__dirname, '../src/embed/widget.tsx')],
      bundle: true,
      minify: true,
      sourcemap: true,
      format: 'iife',
      target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
      outfile: path.resolve(__dirname, '../public/embed.js'),
      loader: {
        '.tsx': 'tsx',
        '.ts': 'tsx',
      },
      define: {
        'process.env.NODE_ENV': '"production"',
      },
      external: ['react', 'react-dom'],
      inject: [path.resolve(__dirname, './react-shim.js')],
    });

    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build(); 