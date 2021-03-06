import * as derefSync from 'json-schema-deref-sync';
import * as refParser from 'json-schema-ref-parser';
import resolve from './../tests/mockResolve';
import { dereference } from './../src/index';
import benchmark from './benchmark';

const title = 'jst/dereference comparision - temando.swagger.json';
const description =
    'This benchmark tests the performance of the jst/dereference function using ' +
    'the Temando Phoenix API swagger payload. This is a large json payload.'
const tests = [
    {
        id: 'jst/dereference',
        deferred: false,
        exec: () => {
            dereference(require('./../resources/temando.swagger.json'), resolve)
        },
    },
    {
        id: 'json-schema-deref-sync',
        deferred: false,
        exec: () => {
            derefSync(require('./../resources/temando.swagger.json'));
        }
    },
    {
        id: 'json-schmea-ref-parser',
        deferred: true,
        exec: (defer) => {
            refParser.dereference(
                require('./../resources/temando.swagger.json'),
                (err, x) => {
                    defer.resolve();
                }
            );
        },
    },
];

benchmark(title, description, tests);
