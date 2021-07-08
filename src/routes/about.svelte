<script>
    import {
        Content,
        Breadcrumb,
        BreadcrumbItem,
        Grid,
        Row,
        Column,
        Form,
        FormGroup,
        Select,
        SelectItem,
        Loading,
        Button,
    } from "carbon-components-svelte";
    import { onMount } from "svelte";
    import Header from "../components/Header.svelte";
    import Theme from "../components/Theme.svelte";
    import { getloggedinfo, verifylogindata, logout } from "../js/auth.js";
    import {} from "svelte-materialify";
    import { Divider } from "svelte-materialify";

    let theme = "g10";
    let loginval = getloggedinfo();

    onMount(async () => {
        loginval = await verifylogindata();
    });

    $: (() => {
        if (!loginval) {
            logout();
            location.href = "#/login";
        }
    })();
</script>

<svelte:head>
    <title>SWD - About</title>
</svelte:head>

<Theme persist bind:theme>
    <Header />
    <Content style="background: none; padding: 1rem">
        <Grid>
            <Row>
                <Column lg={16}>
                    <Breadcrumb noTrailingSlash aria-label="Page navigation">
                        <BreadcrumbItem href="#/">Home</BreadcrumbItem>
                        <BreadcrumbItem>About</BreadcrumbItem>
                    </Breadcrumb>
                </Column>
            </Row>
        </Grid>
        <br /><Divider class="grey lighten-2" />

        <div class="d-flex justify-center mt-4 mb-4">
            <Grid>
                <Row>
                    <h4 style="margin-bottom: 1.5rem">Stand With Dorayaki</h4>
                </Row>
            </Grid>
        </div>

        <div class="d-flex justify-center mt-4 mb-4">
            <Grid>
                <Row>
                    <img
                        alt="deksripsi"
                        src="https://lh4.googleusercontent.com/rjZMjgE3b8-JIkJ2q0YfZbRG3gGdlBrxIykPMGwXY1oa3zAE84bJOEis0GyDR7cAIhi1wtquBCdroHb5V0BoBckfLbMk7ipjk9UoiCOCO5X9j0o5rp7pTQ9aRxFhTW40fADBml6v"
                    />
                </Row>
            </Grid>
        </div>

        <div class="d-flex justify-center mt-4 mb-4">
            <Grid>
                <Row>
                    <b>“Doremonangis and Dorayaki, colorized (2021)”</b>
                </Row>
            </Grid>
        </div>

        <div class="d-flex justify-center mt-4 mb-4">
            <Grid>
                <Row style="width:700px">
                    <Column>
                        Doremonangis, robot dari masa depan sedang mencoba untuk
                        membuka suatu bisnis pada bidang F&B, yaitu membuat
                        dorayaki kekinian (rasa pempek, rasa KFC, rasa nasi
                        padang, dan lain-lain) di tahun 2021 ini. Mobita, teman
                        baiknya membantunya untuk mendirikan usaha dorayakinya
                        dengan menjadi Co-Founder sekaligus CTO dari usaha
                        Doremonangis yang bernama “Stand with Dorayaki”. Selaku
                        CTO, Mobita tentu dipekerjakan oleh Doremonangis untuk
                        membuat sebuah sistem untuk memanajemen tokonya. Akan
                        tetapi, karena Mobita adalah anak yang pemalas, toko
                        Doremonangis sudah memiliki banyak franchise di berbagai
                        tempat. Sehingga, sistem yang dibuat harus menyesuaikan
                        kebutuhan bisnis dari tokonya, apalagi sekarang banyak
                        toko yang mulai kehabisan stok Dorayaki rasa pempek!
                        Oleh karena itu, sebagai teman Mobita yang berkuliah di
                        バンドン工科大学 (ITB) cabang Shinjuku, kalian akan
                        dipekerjakan oleh Mobita untuk membuat sistem ini.
                    </Column>
                </Row>
            </Grid>
        </div>

        <div class="d-flex justify-center mt-4 mb-4">
            <Grid>
                <Row>Dibuat dan dikembangkan oleh Rezda A.F</Row>
            </Grid>
        </div>
    </Content>
</Theme>
