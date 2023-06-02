const paquetes = new Map();

const claroPaq = {
    id: 300,
    paqs: [
        {
            id: 30,
            name: '50 Min TD 1 DIA',
            detail: '1 dia 50 minutos todo destino',
            price: '1.000'
        }, 
        {
            id: 33,
            name: '60 Min TD 2 DIAS',
            detail: '60 minutos todo destino 2 Dias',
            price: '3.000'
        },
        {
            id: 38,
            name: 'INTERNET 800 MB + Chat WA+FB+TW 3 dia',
            detail: 'Navegacion 800 MB + Chat Whatsapp Facebook Twitter por 3 Dias',
            price: '4.000'
        },
        {
            id: 43,
            name: 'Navegacion ilimitada 2 Horas',
            detail:'Navegacion ilimitada 2 Horas',
            price: '5.000'
        }, 
        {
            id: 50,
            name: 'TODO INCLUIDO Min y sms Ilimitados + 400 mb 2 Dias',
            detail: 'LLAMADAS ILIMITADO TD Y SMS Chat What+Face+Twitt + 400 mb 2 dias',
            price: '3.500'
        },
        {
            id: 51,
            name: "TODO INCLUIDO Min Ilimitados + 1 Gb 6 Dias",
            detail: "LLAMADAS ILIMITADO TD Y SMS Chat What+Face+Twitt + 1 Gb 6 dias",
            price: '6.000'
        }, 
        {
            id: 52,
            name: ''
        },
        {
            id: 53,
            name: ''
        },
        {
            id: 54,
            name: "300 Min TD 1 Dia",
            datail: "300 Minutos Todo Destino 24 Horas",
            price: "1.500"
        },
        {
            id: 74,
            name: ''
        },
        {
            id: 141,
            name: 'TODO INCLUIDO Min Ilimitados + 2 Gb 7 Dias',
            detail: 'LLAMADAS ILIMITADO TD Y SMS Chat What+Face+Twitt + 2 Gb 7 dias',
            price: '7.500'
        },
        {
            id: 204,
            name: ''
        },
        {
            id: 219,
            name: ''
        },
        {
            id: 220,
            name: ''
        }
    ]
}

const movistarPaq = {
    id: 301,
    paqs: [
        {
            id: 7,
            name: '20 Min TD 1 dia',
            detail: '20 Minutos a Todo Destino con vigencia 24 horas',
            price: '1.000'
        },
    ]
}

const tigoPaq = {
    id: 302,
    paqs: [
        {
            id: 58,
            name: '5 GB + Minutos y SMS Ilimitados a TD 7 dias',
            detail: '5 GB + Minutos y SMS Ilimitados a todo destino nacional 7 Dias',
            price: '11.000'
        },
        {
            id: 75,
            name: '',
            detail: '',
            price: ''
        },
        {
            id: 76,
            name: '1 GB + Minutos y SMS Ilimitados a TD 2 Dias',
            detail: '1 GB + Minutos y SMS Ilimitados a todo destino nacional 2 Dias',
            price: '3.500'
        },
        {
            id: 79,
            name: '1.5 Gb + Min y SMS Ilimitados a TD + WhatsApp y Facebook 7 Dias',
            detail: '1.5 Gb + Minutos y SMS Ilimitados a todo destino nacional + WhatsApp y Facebook 7 Dias',
            price: '5.500'
        },
        {
            id: 81,
            name: '',
            detail: '',
            price: ''
        },
        {
            id: 84,
            name: '7 Min+ 3 SMS TD 1 DIA',
            detail: '7 Min y 3 mensajes de texto a todo destino nacional, con vigencia 1 Dia',
            price: '1.000'
        },
        {
            id: 90,
            name: 'INTERNET 60 MB + 60 MIN 1 DIA',
            detail: 'INTERNET 60 MB + 60 MIN x 1 DIA',
            price: '1.000'
        },
        {
            id: 91,
            name: 'INTERNET 600 MB 7 DIAS',
            detail: 'Internet 600 MB 7 Dias',
            price: '14.900'
        },
        {
            id: 95,
            name: 'Min y SMS ilimitados TD + WhatsApp y Facebook +1.4 Gb 6 dias',
            detail: 'Min y MSM ilimitados TD + 1.4 Gb + WhatsApp y Facebook 6 Dias',
            price: '6.500'
        },
        {
            id: 96,
            name: '',
            detail: '',
            price: ''
        },
        {
            id: 132,
            name: '',
            detail: '',
            price: ''
        },
        {
            id: 196,
            name: '500 MB + Min y SMS Ilimitados TD + WhApp y Fabook 5 Dias',
            detail: '500 MB + Minutos y SMS Ilimitados todo destino nacional + WhatsApp y Facebook. 5 Dias',
            price: '3.500'
        },
        {
            id: 198,
            name: '',
            detail: '',
            price: ''
        },
        {
            id: 238,
            name: '',
            detail: '',
            price: ''
        },
    ]
}

paquetes.set("claro", claroPaq)
paquetes.set("movistar", movistarPaq)
paquetes.set("tigo", tigoPaq)

module.exports = paquetes