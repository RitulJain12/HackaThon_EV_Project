
const app=require('./src/app');
const {PORT}=require('./src/config/config');
const Connectdb=require('./src/config/db')


Connectdb()
.then(() => {
    app.listen(PORT, () => {
        console.log("Server IS running");
    });
})
.catch((err) => {
    console.log(err);
    process.exit(1);
});
