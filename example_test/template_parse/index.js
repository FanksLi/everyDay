

class TemplateParse {
    constructor(propertys = {}) {
        this.propertys = propertys;
        this.property = '';
        this.target = '';
    }
    init() {
        this.property = '';
        this.target = '';
    }
    parse(str) {
        this.init();
        let state = this.start;
        for(const char of str) {
            state = state(char);
        }
        return this.target;
    }
    start = (char) => {
        if(char === '<') {
            return this.beforeProperty;
        } else {
            this.target += char;
            return this.start;
        }
    }
    beforeProperty = (char) => {
        if(char === '%') {
            return this.beforeProperty;
        } else if(char === '=') {
            return this.firstPropertyChar;
        } else {
            return this.start(char);
        }
    }
    firstPropertyChar = (char) => {
        const reg = /[a-zA-Z_$]/;
        if(char === '%'){
            return this.propertyParse(char);
        } else if(!reg.test(char)) {
            throw Error(`模板语法错误, 变量名不能以${char}开头`);
        } else {
            return this.propertyParse(char);
        }
    }
    propertyParse = (char) => {
       if(char === '%') {
            return this.afterProperty;
        } else {
            this.property += char;
            return this.propertyParse;
        }
    }
    afterProperty = (char) => {
        if(char === '>') {
            const value = this.propertys[this.property];
            if(typeof value === 'undefined') {
                this.target += 'null';
            } else {
                this.target += value;
            }
            this.property = '';
            return this.start;
        } else {
            throw Error(`模板语法错误`);
        }
    }
}

module.exports = TemplateParse;