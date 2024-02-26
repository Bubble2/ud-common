
import babel from '@rollup/plugin-babel'; // 支持jsx
import commonjs from '@rollup/plugin-commonjs'; // 支持按commonjs规范来导入外部模块
import resolve from '@rollup/plugin-node-resolve'; // 支持内部的模块路径解析
import { uglify } from 'rollup-plugin-uglify';
import json from '@rollup/plugin-json';
import rollupTypescript from '@rollup/plugin-typescript';
import pkg from './load-package.cjs';

const external = pkg.peerDependencies && Object.keys(pkg.peerDependencies);
const env = process.env.BUILD_ENV;
console.log(`env is ${env}`);

const distFileName = 'ud-utils';
const globalName = 'UdUtils';


const env2outputConf = {
    commonjs: {
        format: 'cjs',
        dir: 'lib',
    },
    es: {
        format: 'es',
        dir: 'es',
    },
    development: {
        format: 'umd',
        file: `dist/${distFileName}.js`,
        name: globalName,
    },
    production: {
        format: 'umd',
        file: `dist/${distFileName}.min.js`,
        name: globalName,
    },
};

const config = {
    input: 'src/index.ts',
    external,
    output: {
        ...env2outputConf[env]
    },
    plugins: [
        rollupTypescript(),
        resolve(),
        json(),
        babel({
            exclude: '**/node_modules/**',
            babelHelpers: 'bundled',
        }),
        commonjs(),
    ]
}


if (env === 'production') {
    config.plugins.push(
        uglify({
            compress: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
            },
        }),
    );
}

export default config;