import * as akala from '@akala/server'

var http: akala.Http = akala.resolve('$http');
if (require.main == module)
{
    if (process.argv.length < 3)
    {
        console.log('SCPD url is required');
    }
    http.getXML(process.argv[2]).then((xml) =>
    {
        var scpd = xml.scpd;
        console.log('import { EventEmitter } from \'events\'');
        console.log('import * as akala from \'@akala/core\'');
        console.log('import * as xml2js from \'xml2js\'');
        console.log('import {promisify} from \'util\'');
        console.log('const parseXml=promisify(xml2js.parseString)');

        console.log();
        console.log('export namespace v' + scpd.specVersion[0].major[0] + scpd.specVersion[0].minor[0]);
        console.log('{');

        console.log('export type i4=number;')
        console.log('export type ui4=number;')


        akala.each(scpd.serviceStateTable[0].stateVariable, function (variable)
        {
            if (variable.allowedValueList)
            {
                console.log('export type ' + variable.name[0] + '= \'' + variable.allowedValueList[0].allowedValue.join('\' | \'') + '\'');
            }
            else
                console.log('export type ' + variable.name[0] + '= ' + variable.dataType[0]);

        });

        console.log('export class Service extends EventEmitter {')
        console.log();
        console.log('public constructor(private $serviceType:string){ super(); }');
        akala.each(scpd.serviceStateTable[0].stateVariable, function (variable)
        {
            if (variable.defaultValue)
                console.log('public ' + variable.name[0] + ': ' + variable.name[0] + '=\'' + variable.defaultValue[0] + '\';');
            else
                console.log('public ' + variable.name[0] + ': ' + variable.name[0] + ';');
        });


        akala.each(scpd.actionList[0].action, function (action)
        {
            console.log('public async ' + action.name[0] + '(');
            var isFirst = true;

            akala.each(action.argumentList[0].argument, function (arg)
            {
                if (arg.direction[0] == 'in' && !arg.relatedStateVariable)
                {
                    if (isFirst)
                    {
                        isFirst = false
                        console.log(arg.name[0] + ':' + arg.relatedStateVariable[0].replace(/ -/g, ''));
                    }
                    else
                        console.log(', ' + arg.name[0] + ':' + arg.relatedStateVariable[0].replace(/ -/g, ''));
                }
            })
            console.log('){');
            console.log('var http:akala.Http=akala.resolve(\'$http\');');
            console.log('var result=await http.invokeSOAP(this.$serviceType, "' + action.name[0] + '", {');

            var isFirst = true;
            akala.each(action.argumentList[0].argument, function (arg)
            {
                if (arg.direction[0] == 'in')
                {
                    if (isFirst)
                    {
                        isFirst = false
                        console.log(arg.name[0] + ': this.' + arg.relatedStateVariable[0].replace(/ -/g, ''));
                    }
                    else
                        console.log(', ' + arg.name[0] + ': this.' + arg.relatedStateVariable[0].replace(/ -/g, ''));
                }
            });

            console.log('} as any)')

            console.log('var xmlResponse= await parseXml(await result.text(), { async: true });');

            akala.each(action.argumentList[0].argument, function (arg)
            {
                if (arg.direction[0] == 'out')
                    console.log('this.' + arg.relatedStateVariable[0].replace(/ -/g, '') + '=xmlResponse.Envelope.Body[0].' + action.name[0] + 'Response.' + arg.name[0] + '[0]');
            })

            console.log('}');
        })
        console.log('}');
        console.log('}');
    })
}