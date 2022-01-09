(()=>{"use strict";var e={502:(e,t,a)=>{var i;Object.defineProperty(t,"__esModule",{value:!0}),t.AppController=void 0;const s=a(752),r=a(498),o=a(481),n=a(332),c=a(147),d=a(490);let l=class{constructor(e){this.httpService=e,this.isGetDataToCache=!1,this.dirName=`${__dirname}/cache`,this.isGetDataToCache=!!process.argv[2],console.log("enable isGetDataToCache: ",this.isGetDataToCache)}getData(e,t,a,i){return(0,s.__awaiter)(this,void 0,void 0,(function*(){const s=this.convertParamAndUrl(a,t,e),r=yield this.getFromCache(s,"get",t,void 0,!1);if(r)return this.log(Object.assign(Object.assign({},s),{description:"lay trong cache, ko call api"}),r),void i.json(r);try{const a=yield this.httpService.request(Object.assign(Object.assign({},s),{method:"get",params:t,headers:e,withCredentials:!0})).toPromise();this.writeFile(`${this.dirName}/${this.buildKey(s,"get",t,void 0)}.json`,JSON.stringify(a.data)),i.json(a.data)}catch(e){const a=yield this.getFromCache(s,"get",t,void 0,!0);if(a)return this.log(Object.assign(Object.assign({},s),{description:"lay trong cache, call api loi"}),a),void i.json(a);throw new n.HttpException(e.toJSON().message,e.toJSON().status||500)}}))}postData(e,t,a,i,r){return(0,s.__awaiter)(this,void 0,void 0,(function*(){const s=this.convertParamAndUrl(a,t,e),o=yield this.getFromCache(s,"post",t,r,!1);if(o)return i.json(o),void this.log(Object.assign(Object.assign({},s),{description:"lay trong cache, ko call api"}),o);try{const a=yield this.httpService.request(Object.assign(Object.assign({},s),{method:"post",params:t,headers:e,data:r,withCredentials:!0})).toPromise();this.writeFile(`${this.dirName}/${this.buildKey(s,"post",t,r)}.json`,JSON.stringify(a.data)),i.json(a.data)}catch(e){const a=yield this.getFromCache(s,"post",t,r,!0);if(a)return i.json(a),void this.log(Object.assign(Object.assign({},s),{description:"lay trong cache, call api loi"}),a);throw new n.HttpException(e.toJSON().message,e.toJSON().status||500)}}))}putData(e,t,a,i,r){return(0,s.__awaiter)(this,void 0,void 0,(function*(){const s=this.convertParamAndUrl(a,t,e),o=yield this.getFromCache(s,"put",t,r,!1);if(o)return this.log(Object.assign(Object.assign({},s),{description:"lay trong cache, ko call api"}),o),void i.json(o);try{const a=yield this.httpService.request(Object.assign(Object.assign({},s),{method:"put",params:t,headers:e,data:r,withCredentials:!0})).toPromise();this.writeFile(`${this.dirName}/${this.buildKey(s,"put",t,r)}.json`,JSON.stringify(a.data)),i.json(a.data)}catch(e){const a=yield this.getFromCache(s,"put",t,r,!0);if(a)return this.log(Object.assign(Object.assign({},s),{description:"lay trong cache, call api loi"}),a),void i.json(a);throw new n.HttpException(e.toJSON().message,e.toJSON().status||500)}}))}patchData(e,t,a,i,r){return(0,s.__awaiter)(this,void 0,void 0,(function*(){const s=this.convertParamAndUrl(a,t,e),o=yield this.getFromCache(s,"patch",t,r,!1);if(o)return this.log(Object.assign(Object.assign({},s),{description:"lay trong cache, ko call api"}),o),void i.json(o);try{const a=yield this.httpService.request(Object.assign(Object.assign({},s),{method:"patch",params:t,headers:e,data:r,withCredentials:!0})).toPromise();this.writeFile(`${this.dirName}/${this.buildKey(s,"patch",t,r)}.json`,JSON.stringify(a.data)),i.json(a.data)}catch(e){const a=yield this.getFromCache(s,"patch",t,r,!0);if(a)return this.log(Object.assign(Object.assign({},s),{description:"lay trong cache,call api loi"}),a),void i.json(a);throw new n.HttpException(e.toJSON().message,e.toJSON().status||500)}}))}deleteData(e,t,a,i){return(0,s.__awaiter)(this,void 0,void 0,(function*(){const s=this.convertParamAndUrl(a,t,e),r=yield this.getFromCache(s,"delete",t,void 0,!0);if(r)return i.json(r),void this.log(Object.assign(Object.assign({},s),{description:"lay trong cache, ko call api"}),r);try{const a=yield this.httpService.request(Object.assign(Object.assign({},s),{method:"delete",params:t,headers:e,withCredentials:!0})).toPromise();this.writeFile(`${this.dirName}/${this.buildKey(s,"delete",t,void 0)}.json`,JSON.stringify(a.data)),i.json(a.data)}catch(e){const a=yield this.getFromCache(s,"delete",t,void 0,!0);if(a)return i.json(a),void this.log(Object.assign(Object.assign({},s),{description:"lay trong cache, call api loi"}),a);throw new n.HttpException(e.toJSON().message,e.toJSON().status||500)}}))}getFromCache(e,t,a,i,r){return(0,s.__awaiter)(this,void 0,void 0,(function*(){const s=this.buildKey(e,t,a,i);if(this.isGetDataToCache||r){let t=yield this.readFile(`${this.dirName}/${s}.json`);return void 0===t||(t=JSON.parse(t),console.log(e," get from cache",t)),t}}))}convertParamAndUrl(e,t,a){const i=e.path.replace("/server-mask",""),s=`${decodeURIComponent(t.FE_URL)}`;return a.host=s.replace("https://",""),delete a["content-length"],delete t.FE_URL,{baseURL:s,url:i}}buildKey(e,t,a,i){return d(`${JSON.stringify(e)}${t}${JSON.stringify(a||{})}${JSON.stringify(i||{})}`)}writeFile(e,t){return new Promise((a=>{c.existsSync(this.dirName)||c.mkdirSync(this.dirName);var i=c.createWriteStream(e);return i.write(t),i.end(),console.log('wirte-file: "',e,'" success'),a()}))}readFile(e){return new Promise((t=>(0,s.__awaiter)(this,void 0,void 0,(function*(){c.readFile(e,((a,i)=>{a?t(void 0):(console.log('read-file: "',e,'" success'),t(i))}))}))))}log(e,t){console.log(e,"response Data: ",t)}};(0,s.__decorate)([(0,o.Get)(),(0,s.__param)(0,(0,o.Headers)()),(0,s.__param)(1,(0,o.Query)()),(0,s.__param)(2,(0,o.Req)()),(0,s.__param)(3,(0,o.Res)()),(0,s.__metadata)("design:type",Function),(0,s.__metadata)("design:paramtypes",[Object,Object,Object,Object]),(0,s.__metadata)("design:returntype",Promise)],l.prototype,"getData",null),(0,s.__decorate)([(0,o.Post)(),(0,s.__param)(0,(0,o.Headers)()),(0,s.__param)(1,(0,o.Query)()),(0,s.__param)(2,(0,o.Req)()),(0,s.__param)(3,(0,o.Res)()),(0,s.__param)(4,(0,o.Body)()),(0,s.__metadata)("design:type",Function),(0,s.__metadata)("design:paramtypes",[Object,Object,Object,Object,Object]),(0,s.__metadata)("design:returntype",Promise)],l.prototype,"postData",null),(0,s.__decorate)([(0,o.Put)(),(0,s.__param)(0,(0,o.Headers)()),(0,s.__param)(1,(0,o.Query)()),(0,s.__param)(2,(0,o.Req)()),(0,s.__param)(3,(0,o.Res)()),(0,s.__param)(4,(0,o.Body)()),(0,s.__metadata)("design:type",Function),(0,s.__metadata)("design:paramtypes",[Object,Object,Object,Object,Object]),(0,s.__metadata)("design:returntype",Promise)],l.prototype,"putData",null),(0,s.__decorate)([(0,o.Patch)(),(0,s.__param)(0,(0,o.Headers)()),(0,s.__param)(1,(0,o.Query)()),(0,s.__param)(2,(0,o.Req)()),(0,s.__param)(3,(0,o.Res)()),(0,s.__param)(4,(0,o.Body)()),(0,s.__metadata)("design:type",Function),(0,s.__metadata)("design:paramtypes",[Object,Object,Object,Object,Object]),(0,s.__metadata)("design:returntype",Promise)],l.prototype,"patchData",null),(0,s.__decorate)([(0,o.Delete)(),(0,s.__param)(0,(0,o.Headers)()),(0,s.__param)(1,(0,o.Query)()),(0,s.__param)(2,(0,o.Req)()),(0,s.__param)(3,(0,o.Res)()),(0,s.__metadata)("design:type",Function),(0,s.__metadata)("design:paramtypes",[Object,Object,Object,Object]),(0,s.__metadata)("design:returntype",Promise)],l.prototype,"deleteData",null),l=(0,s.__decorate)([(0,o.Controller)("/server-mask/*"),(0,s.__metadata)("design:paramtypes",["function"==typeof(i=void 0!==r.HttpService&&r.HttpService)?i:Object])],l),t.AppController=l},916:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AppModule=void 0;const i=a(752),s=a(498),r=a(481),o=a(502),n=a(702);let c=class{};c=(0,i.__decorate)([(0,r.Module)({imports:[s.HttpModule],controllers:[o.AppController],providers:[n.AppService]})],c),t.AppModule=c},702:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AppService=void 0;const i=a(752),s=a(481);let r=class{getData(){return{message:"Welcome to server-mask!"}}};r=(0,i.__decorate)([(0,s.Injectable)()],r),t.AppService=r},498:e=>{e.exports=require("@nestjs/axios")},481:e=>{e.exports=require("@nestjs/common")},332:e=>{e.exports=require("@nestjs/common/exceptions/http.exception")},143:e=>{e.exports=require("@nestjs/core")},490:e=>{e.exports=require("md5")},752:e=>{e.exports=require("tslib")},147:e=>{e.exports=require("fs")}},t={};function a(i){var s=t[i];if(void 0!==s)return s.exports;var r=t[i]={exports:{}};return e[i](r,r.exports,a),r.exports}var i={};(()=>{var e=i;Object.defineProperty(e,"__esModule",{value:!0});const t=a(752),s=a(481),r=a(143),o=a(916);!function(){(0,t.__awaiter)(this,void 0,void 0,(function*(){const e=yield r.NestFactory.create(o.AppModule),t=process.env.PORT||3333;e.setGlobalPrefix("/"),e.enableCors({allowedHeaders:"*",origin:"*"}),yield e.listen(t),s.Logger.log(`🚀 Application is running on: http://localhost:${t}`)}))}()})();var s=exports;for(var r in i)s[r]=i[r];i.__esModule&&Object.defineProperty(s,"__esModule",{value:!0})})();
//# sourceMappingURL=main.js.map