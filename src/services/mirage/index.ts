import { createServer, Factory, Model, Response, ActiveModelSerializer } from 'miragejs';
import faker from 'faker';

type User = {
    user: string;
    email: string;
    create_at: string;
}

export function makeServer(){ 
    const server = createServer({
        //Vai permitir fazer o cadastros de usuarios e trabalhar com relacionamentos 
        serializers:{
            application: ActiveModelSerializer,
        },

        models:{
            user: Model.extend<Partial<User>>({})
        },




    //Gerar alguns dados ficticios assim que o servidor for inicializado 
        factories:{
            user: Factory.extend({
                name(i: number) {
                    return `User ${i + 1}`
                },
                email() {
                    return faker.internet.email().toLowerCase();
                },
                created_at() {
                    return faker.date.recent(10);
                },
            })
        },

        seeds(server) {
            server.createList('user',200) //Quantos usuarios fakes seram criados
        },

        //-----------------------------

        routes(){
            this.namespace = 'api';
            this.timing = 750;

            //Shorthands, vai me retornar a lista completa de usuários
            
            // Lógica de paginação
            this.get('/users', function (schema, request) {
                const { currentPage = 1, per_page = 10 } = request.queryParams

                const total = schema.all('user').length

                const pageStart = (Number(currentPage) - 1) * Number(per_page);
                const pageEnd = pageStart + Number(per_page);

                const users = this.serialize(schema.all('user'))
                .users
                //Ordenar usuarios ordem alfabetica (ainda NAO FUNCIONA)
                .sort((a, b) => a.created_at - b.created_at)
                .slice(pageStart, pageEnd);

                return new Response(
                    200,
                    {'x-total-count': String(total) }, //Número total de registros 
                    { users }
                )
            }); 

            // Vai criar a estrutura necessaria pra conseguir criar um usuario
            // Vai criar aumotamicamente uma rota que eu consiga listar os usuarios pelo Id
            this.get('/users/:id');  
            this.post('/users');  

            this.namespace = '';
            this.passthrough()
        }
    })

    return server;
}