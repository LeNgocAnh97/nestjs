import { Controller, Post, Put, Req } from '@nestjs/common';
import { Request, response } from 'express';
const fs = require('fs');

@Controller('*merchant/field*')
export class DynamicFieldController {

    @Put()
    async getDataGet(@Req() request: Request): Promise<any> {
        const [space, module, api, version, other] = request.url.split('/');
        const fileName = `${module}-${api}-${version}-${other.split('?')[0]}`;
        if (fileName && fs.existsSync(`./src/cache/${fileName}.json`)) {
            const data = fs.readFileSync(`./src/cache/${fileName}.json`, 'utf8')
            if (data) {
                const data2 = JSON.parse(data);
                const groups = data2.data;
                let fieldRes = {};
                groups.forEach(group => {
                    group.fields.forEach(field => {
                        if (field.field_name === request.body.field_name) {
                            Object.keys(request.body).forEach(key => {
                                field[key] = request.body[key];
                            });
                            fieldRes = field;
                        }
                    });
                });
                fs.writeFileSync(`./src/cache/${fileName}.json`, JSON.stringify(data2));
                return {
                    code: 200,
                    data: fieldRes,
                    lang: "vi",
                    message: "request thành công."
                }
            }
        }
    }

    @Post()
    async postDataGet(@Req() request: Request): Promise<any> {
        const [space, module, api, version, other] = request.url.split('/');
        const fileName = `${module}-${api}-${version}-${other.split('?')[0]}`;
        if (fileName && fs.existsSync(`./src/cache/${fileName}.json`)) {
            const data = fs.readFileSync(`./src/cache/${fileName}.json`, 'utf8')
            if (data) {
                const data2 = JSON.parse(data);
                const groups = data2.data;
                groups.forEach(group => {
                    const groupPush = groups.find(group => group.group === request.body.group);
                    groupPush.fields.push(request.body);
                });
                fs.writeFileSync(`./src/cache/${fileName}.json`, JSON.stringify(data2));
                return {
                    code: 200,
                    data: request.body,
                    lang: "vi",
                    message: "request thành công."
                }
            }
        }
    }
}
