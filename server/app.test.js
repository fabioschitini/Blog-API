 const request=require('supertest')
 const app=require('./app')

 it('GET /post ->array of posts',()=>{
    return request(app)
        .get("/post")
        .expect("Content-Type",/json/)
        .expect(200)
        .then((response)=>{
            expect(response.body).toEqual(           
                 expect.arrayContaining([
                        expect.objectContaining({
                            title:expect.any(String),
                            summary:expect.any(String),
                            date:expect.any(String),
                            published:expect.any(Boolean),
                            tech:expect.any(Array),
                            outcome:expect.any(String),
                            learned:expect.any(String),
                            feature:expect.any(String)
                        })
                    ])
            )
        })
 })


 it('GET /post/id ->object with post id',()=>{
    return request(app)
        .get("/post/62bc8964c072304023b6ae70")
        .expect("Content-Type",/json/)
        .expect(200)
        .then((response)=>{
            expect(response.body).toEqual(           
                        expect.objectContaining({
                            title:expect.any(String),
                            summary:expect.any(String),
                            date:expect.any(String),
                            published:expect.any(Boolean),
                            tech:expect.any(Array),
                            outcome:expect.any(String),
                            learned:expect.any(String),
                            feature:expect.any(String)
                        })
            )
        })
 })

 it('POST /post/ ->object posted',()=>{
    return request(app)
        .post("/post")
        .set({ fuck: 'token' })
        .send({
            title:'req.body.title',
            summary:'req.body.summary',
            date:'formatedDate()',
            status:false,
            tech:['js,react'],
            feature:'req.body.feature',
            outcome:'req.body.outcome',
            learned:'req.body.learned'
        })
        
        .expect("Content-Type",/json/)
        .expect(200)
        .then((response)=>{
            expect(response.body).toEqual(           
                        expect.objectContaining({
                            title:'req.body.title',
                            summary:'req.body.summary',
                            published:false,
                            tech:['js,react'],
                            outcome:'req.body.outcome',
                            learned:'req.body.learned',
                            feature:'req.body.feature'
                        })
            )
        })
 })


 it('POST /post/ ->object posted',()=>{
    return request(app)
        .post("/post")
        .set({ fuck: 'token' })
        .send({
            title:'req.body.title',
            summary:'req.body.summary',
            date:'formatedDate()',
            status:false,
            tech:['js,react'],
            feature:'req.body.feature',
            outcome:'req.body.outcome',
            learned:'req.body.learned'
        })
        
        .expect("Content-Type",/json/)
        .expect(200)
        .then((response)=>{
            expect(response.body).toEqual(           
                        expect.objectContaining({
                            title:'req.body.title',
                            summary:'req.body.summary',
                            published:false,
                            tech:['js,react'],
                            outcome:'req.body.outcome',
                            learned:'req.body.learned',
                            feature:'req.body.feature'
                        })
            )
        })
 })