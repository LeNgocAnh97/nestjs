import { Controller, Get, Post, Put, Req } from '@nestjs/common';
import { Request, response } from 'express';
const fs = require('fs');

@Controller('*merchant/field*')
export class DynamicFieldController {
    @Get()
    async getDataGet2(@Req() request: Request): Promise<any> {
        const [space, module, api, version, other] = request.url.split('/');
        const fileName = `${module}-${api}-${version}-${other.split('?')[0]}`;
        console.log(fileName);

        if (fileName && fs.existsSync(`./src/cache/${fileName}.json`)) {
            const data = fs.readFileSync(`./src/cache/${fileName}.json`, 'utf8')
            if (data) {
                const data2 = JSON.parse(data);
                // fs.writeFileSync(`./src/cache/${fileName}.json`, JSON.stringify(data2));
                return data2;
            }
        }
    }

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
                const allField = [];



                groups.forEach(group => {
                    group.fields.forEach(field => {
                        if (field.field_name === request.body.field_name) {

                            // Object.keys(request.body).forEach(key => {
                            //     field[key] = request.body[key];
                            // });
                            // fieldRes = field;

                            if (field.group === request.body.group) {
                                Object.keys(request.body).forEach(key => {
                                    field[key] = request.body[key];
                                });
                                fieldRes = field;
                                return;
                            }
                            groups.forEach((group2) => {
                                if (!group2.fields.find(field2 => field2.field_key === request.body.field_key)) {
                                    return;
                                }
                                const index = group2.fields.findIndex(field2 => field2.field_key === field.field_key);
                                if (index === -1) {
                                    return;
                                }
                                group2.fields.splice(index, 1);
                            });
                            groups.forEach(group => {
                                if (group.group === request.body.group) {
                                    const groupPush = groups.find(group => group.group === request.body.group);
                                    const body = Object.assign({}, request.body);
                                    body['history'] = [{ "created_time": "Mon, 13 Dec 2021 05:06:42 GMT", "fullname": "Nguyễn Văn An", "staff_id": "7fc0a33c-baf5-11e7-a7c2-0242ac180003", "username": "admin@pingcomshop" }, { "created_time": "Fri, 21 Jan 2022 09:57:54 GMT", "fullname": "Nguyễn Văn Ann", "staff_id": "7fc0a33c-baf5-11e7-a7c2-0242ac180003", "username": "admin@pingcomshop" }];
                                    groupPush.fields.push(body);
                                }

                            });
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
                    if (group.group === request.body.group) {
                        const groupPush = groups.find(group => group.group === request.body.group);
                        const body = Object.assign({}, request.body);
                        body['history'] = [{ "created_time": "Mon, 13 Dec 2021 05:06:42 GMT", "fullname": "Nguyễn Văn An", "staff_id": "7fc0a33c-baf5-11e7-a7c2-0242ac180003", "username": "admin@pingcomshop" }, { "created_time": "Fri, 21 Jan 2022 09:57:54 GMT", "fullname": "Nguyễn Văn Ann", "staff_id": "7fc0a33c-baf5-11e7-a7c2-0242ac180003", "username": "admin@pingcomshop" }];
                        groupPush.fields.push(body);
                    }

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
