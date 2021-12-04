import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import vitePluginImp from 'vite-plugin-imp'
import { resolve } from 'path'
import fs from 'fs'
import path from 'path'
import lessToJS from 'less-vars-to-js'
const { getThemeVariables } = require('antd/dist/theme');
const http = require('http');
const util = require('util');
const url = require('url');
const chalk = require('chalk');


const pathResolve = (pathStr: string): string => {
    return resolve(__dirname, '.', pathStr)
}

const themeVariables = lessToJS(
    fs.readFileSync(path.resolve(__dirname, './config/variables.less'), 'utf8')
)

// const apiService = http.createServer(function (req, res) {
//     const {
//         method
//     } = req;
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//     res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

//     res.writeHead(200, {
//         'Content-Type': 'application/json'
//     });

//     if (method === 'OPTIONS') {
//         res.end();
//         return;
//     };


//     if (method === 'GET') {
//         const {
//             pathname,
//             query
//         } = url.parse(req.url, true);
//         console.log('sdfsdfdsf');
        
//     }
// });


// apiService.listen("10.22.29.103", 9090, () => {
//     var addr = `http://${'http://10.22.29.103'}:${9090}`; 
//     console.info(`listenning in:${chalk.red(addr)}`);
// })


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        reactRefresh(),
        vitePluginImp({
            libList: [
                {
                    libName: "antd",
                    style: (name) => `antd/lib/${name}/style/index.less`,
                },
            ],
        })
    ],
    base: './',
    publicDir: '',
    server: {
        host: '0.0.0.0'
    },
    resolve: {
        alias: {
            '@': pathResolve('./src'),
        }
    },
    css: {
        preprocessorOptions: {
            less: {
                // 支持内联 JavaScript
                javascriptEnabled: true,
                modifyVars: themeVariables
                //  getThemeVariables({
                //     dark: true
                // }) //themeVariables
            }
        },
    },

})
