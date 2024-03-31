const TemplateParse = require('../example_test/template_parse');


describe('template_parse', () => {

    it('parse', () => {
        const str = 'how are you, my name is <%=name%>';
        const temp = new TemplateParse({name: 'fanfan'});
        const s = temp.parse(str);
        expect(s).toEqual('how are you, my name is fanfan');
    });

    it('how are you, my name is null', () => {
        const str = 'how are you, my name is <%=name%>';
        const temp = new TemplateParse({});
        const s = temp.parse(str);
        expect(s).toEqual('how are you, my name is null');
    });

    it('how are you, my name is  <%=', () => {
        const str = 'how are you, my name is <%=';
        const temp = new TemplateParse({});
        const s = temp.parse(str);
        expect(s).toEqual('how are you, my name is ');
    });
    it('how are you, my name is  <%=%>', () => {
        const str = 'how are you, my name is <%=%>';
        const temp = new TemplateParse({});
        const s = temp.parse(str);
        expect(s).toEqual('how are you, my name is null');
    });
    it('how are you, my name is <%=name%>, age <%=age%>', () => {
        const str = 'how are you, my name is <%=name%>, age <%=age%>';
        const temp = new TemplateParse({name: 'fanfan', age: 18});
        const s = temp.parse(str);
        expect(s).toEqual('how are you, my name is fanfan, age 18');
    });
    it('<%=name%>, 我叫了你<%count%>次了', () => {
        const str = '<%=name%>, 我叫了你<%=count%>次了';
        const temp = new TemplateParse({name: 'fanfan', count: 3});
        const s = temp.parse(str);
        expect(s).toEqual('fanfan, 我叫了你3次了');
    });
    it('<%=name%>, <%=age%>, <%=sex%>', () => {
        const str = '<%=name%>, <%=age%>, <%=sex%>';
        const temp = new TemplateParse({name: 'fanfan', age: 3, sex: '打篮球'});
        const s = temp.parse(str);
        expect(s).toEqual('fanfan, 3, 打篮球');
    });
});