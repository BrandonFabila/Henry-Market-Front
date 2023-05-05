<h1>comentar const de deploy y activar la const de local

<script>
    src: {
        components: {
            admin: {
                FormCreateProduct: FormCreateProduct.jsx,
            },
            CheckoutForm: CheckoutForm.jsx,
            FormLogin: FormLogin.jsx,
            FormUpdate: FormUpdate.jsx
        },
        pages: {
            Detail: Detail.jsx,
        },
        store: {
            actions: index.js,
        }
    }

    const api_host= "http://localhost:3001/";
    // const api_host = 'deploy'
</script>

