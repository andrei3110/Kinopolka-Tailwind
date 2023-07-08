const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function category() {
    const createCategory = await prisma.categories.createMany({
        data: [
            { name: "фильмы" },
            { name: "сериалы" },
            { name: "мультфильмы"}
        ],
        skipDuplicates: true
        }
    );
   
}


async function users() {
    const users = await prisma.users.createMany({
        data: [
            { 
                name: "Admin" ,
                password: '$2b$10$jOW3VhJ7k8lPagE4/S.BL.d67YNfmAtJsEXPMPzUe3f463SAKPWv2',//311007
                status:'подписка', 
                avatar:'Alto.png',
                type:"Admin"

            },  
        ],
        skipDuplicates: true
        }
    );
}


async function attribute() {
    const attribute = await prisma.attribute.createMany({
        data: [
            { 
                name: "жанры" ,
                tag: "genre"
            },  
            { 
                name: "страны" ,
                tag : "country"
            },
            { 
                name: "годы" ,
                tag : "years"
            },
        ],
        skipDuplicates: true
        }
    );
}

async function attribute_values() {
    const attribute_values = await prisma.attribute_values.createMany({
        data: [
            { 
                name: "боевик" ,
               
            },
            {
                name: "комедии",
         
            },
            { 
                name: "романтика",
               
            },
            { 
                name: "драма",
              
            },
            { 
                name: "мелодрама",
             
            },
            {
                name: "триллер",
               
            },
            {
                name: "исторический",
               
            },
            {  
                name: "трагедия",
             
            },
            {
                name: "фантастика",
             
                },
            { 
                name: "приключения",
            
            },
            { 
                name: "семейный",
               
            },
            { 
                name: "детский",
           
            },
            {
                 name: "детектив",
          
            },
            { 
                name: "мистика",
            
            },
            {
                 name: "криминал",
             
            },    
            { 
                name: "Россия" ,
            },  
            { 
                name: "СССР" ,
            },
            { 
                name: "США" ,
            },
            { 
                name: "Франция" ,
            },
            { 
                name: "Южная Корея" ,
            },
            { 
                name: "Великобритания" ,
            },  
            { 
                name: "Япония" ,
            },
            { 
                name: "Италия" ,
            },
            { 
                name: "Испания" ,
            },
            { 
                name: "Германия" ,
            },
            { 
                name: "Турция" ,
            },
            { 
                name: "Швеция" ,
            },
            { 
                name: "Дания" ,
            },
            { 
                name: "2023 год",
              
            },
            { 
                name: "2022 год",
               
            },
            { 
                name: "2021 год",
               
            },
            { 
                name: "2020 год",
             
            },
            { 
                name: "2019 год",
           
            },
            { 
                name: "2018 год",
              
            },
            { 
                name: "2017 год",
            
            },
            { 
                name: "2016 год",
                
            },
            { 
                name: "2015 год",
              
            },
            { 
                name: "2010-ые годы",
           
            },
            { 
                name: "2000-ые года",
            
            },
            { 
                name: "1990-ые года",
               
            },
            { 
                name: "1890-ые года",
            },

        ],
        skipDuplicates: true
        }
    );
}

async function attribute_attribute_values() {
    const attribute_attribute_values = await prisma.attribute_attribute_values.createMany({
        data: [
            { 
                attributeId: 1,
                attribute_valueId:1
            },  
            { 
                attributeId: 1,
                attribute_valueId:2
            },
            { 
                attributeId: 1,
                attribute_valueId:3
            },
            { 
                attributeId: 1,
                attribute_valueId:4
            },
            { 
                attributeId: 1,
                attribute_valueId:5
            },
            { 
                attributeId: 1,
                attribute_valueId:6
            },
            { 
                attributeId: 1,
                attribute_valueId:7
            },
            { 
                attributeId: 1,
                attribute_valueId:8
            },
            { 
                attributeId: 1,
                attribute_valueId:9
            },
            { 
                attributeId: 1,
                attribute_valueId:10
            },
            { 
                attributeId: 1,
                attribute_valueId:11
            },
            { 
                attributeId: 1,
                attribute_valueId:12
            },
            { 
                attributeId: 1,
                attribute_valueId:13
            },
            { 
                attributeId: 1,
                attribute_valueId:14
            },
            { 
                attributeId: 1,
                attribute_valueId:15
            },
            { 
                attributeId: 2,
                attribute_valueId:16
            },
            { 
                attributeId: 2,
                attribute_valueId:17
            },
            { 
                attributeId: 2,
                attribute_valueId:18
            },
            { 
                attributeId: 2,
                attribute_valueId:19
            },
            { 
                attributeId: 2,
                attribute_valueId:20
            },
            { 
                attributeId: 2,
                attribute_valueId:21
            },
            { 
                attributeId: 2,
                attribute_valueId:22
            },
            { 
                attributeId: 2,
                attribute_valueId:23
            },
            { 
                attributeId: 2,
                attribute_valueId:24
            },
            { 
                attributeId: 2,
                attribute_valueId:25
            },
            { 
                attributeId: 2,
                attribute_valueId:26
            },
            { 
                attributeId: 2,
                attribute_valueId:27
            },
            { 
                attributeId: 2,
                attribute_valueId:28
            },
            { 
                attributeId: 3,
                attribute_valueId:29
            },
            { 
                attributeId: 3,
                attribute_valueId:30
            },
            { 
                attributeId: 3,
                attribute_valueId:31
            },
            { 
                attributeId: 3,
                attribute_valueId:32
            },
            { 
                attributeId: 3,
                attribute_valueId:33
            },
            { 
                attributeId: 3,
                attribute_valueId:34
            },
            { 
                attributeId: 3,
                attribute_valueId:35
            },
            { 
                attributeId: 3,
                attribute_valueId:36
            },
            { 
                attributeId: 3,
                attribute_valueId:37
            },
            { 
                attributeId: 3,
                attribute_valueId:38
            },
            { 
                attributeId: 3,
                attribute_valueId:39
            },
            { 
                attributeId: 3,
                attribute_valueId:40
            },
            { 
                attributeId: 3,
                attribute_valueId:41
            },

 
        ],
        skipDuplicates: true
        }
    );
}
attribute_values()
attribute()
attribute_attribute_values() 
category()
users()


    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1); 
    })