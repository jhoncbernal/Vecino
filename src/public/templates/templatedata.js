import json2csv from 'json2csv';
 
export function get(req, res) {
 
    let fields = [
        'codigo',
        'nombre',
        '_1_30',
        '_31_60',	
        '_61_90',	
        '_mas_90',	
        'total'
    ];
 let dataExample=[
    {
        "codigo": "1101",
        "nombre": "xxxx",
        "_1_30": "87400",
        "_31_60": "85680",
        "_61_90": "84300",
        "_mas_90": "0",
        "total": "257380"
    },
    {
        "codigo": "1102",
        "nombre": "xxxx",
        "_1_30": "98300",
        "_31_60": "96440",
        "_61_90": "278450",
        "_mas_90": "0",
        "total": "473190"
    },
    {
        "codigo": "1103",
        "nombre": "xxxx",
        "_1_30": "98100",
        "_31_60": "96300",
        "_61_90": "271280",
        "_mas_90": "0",
        "total": "465680"
    },
    {
        "codigo": "1104",
        "nombre": "xxxx",
        "_1_30": "0",
        "_31_60": "0",
        "_61_90": "0",
        "_mas_90": "0",
        "total": "0"
    }
 ]
    var csv = json2csv({ data: dataExample, fields: fields });
 
    res.set("Content-Disposition", "attachment;filename=authors.csv");
    res.set("Content-Type", "application/octet-stream");
 
    res.send(csv);
 
}