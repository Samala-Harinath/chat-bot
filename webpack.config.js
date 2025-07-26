const path = require('path');

module.exports = {
  mode: 'production',
  entry: './components/Chatbot.tsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'chatbot.bundle.js',
    library: 'Chatbot',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.build.json',
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'lucide-react': 'lucide',
  },
};