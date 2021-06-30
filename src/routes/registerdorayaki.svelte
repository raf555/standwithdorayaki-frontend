<script>
    import {
        Content,
        Breadcrumb,
        BreadcrumbItem,
        Grid,
        Row,
        Column,
        Loading,
        Form,
        FormGroup,
        TextInput,
        Button,
    } from "carbon-components-svelte";
    import { Divider } from "svelte-materialify";
    import { onMount } from "svelte";
    import Header from "./../components/Header.svelte";
    import Theme from "./../components/Theme.svelte";
    import { getloggedinfo, verifylogindata, logout } from "./../js/auth.js";
    import Add20 from "carbon-icons-svelte/lib/Add20";
    import { createDorayaki } from "./../js/dorayakiapi.js";
    import Dorayaki from "./../components/Dorayaki.svelte";

    let theme = "g10";
    let loginval = getloggedinfo();
    let batch_ = [];
    let disabled = false;
    let rasa, deskripsi, gambar;
    let invalidrasa, invaliddeskripsi, invalidgambar;
    let invalidrasamsg, invaliddeskripsimsg, invalidgambarmsg;

    const newdorayaki = async () => {
        disabled = true;
        invalidrasa = false;
        invaliddeskripsi = false;
        invalidgambar = false;

        if (!rasa || !deskripsi || !gambar) {
            if (!rasa) {
                invalidrasa = true;
                invalidrasamsg = "Empty input!";
            }
            if (!deskripsi) {
                invaliddeskripsi = true;
                invaliddeskripsimsg = "Empty input!";
            }
            if (!gambar) {
                invalidgambar = true;
                invalidgambarmsg = "Empty input!";
            }
            disabled = false;
            return;
        }

        let out = await createDorayaki({
            rasa: rasa,
            gambar: gambar,
            deskripsi: deskripsi,
        });

        disabled = false;
        invalidrasa = false;
        invalidrasamsg = "";
        invaliddeskripsi = false;
        invaliddeskripsimsg = "";
        invalidgambar = false;
        invalidgambarmsg = "";

        location.href = "#/dorayaki";
    };

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
    <title>Doramonangis - Dorayaki</title>
</svelte:head>

<Theme persist bind:theme>
    <Header />
    <Content style="background: none; padding: 1rem">
        <Grid>
            <Row>
                <Column lg={16}>
                    <Breadcrumb noTrailingSlash aria-label="Page navigation">
                        <BreadcrumbItem href="#/">Home</BreadcrumbItem>
                        <BreadcrumbItem href="#/dorayaki"
                            >Dorayaki</BreadcrumbItem
                        >
                        <BreadcrumbItem>New</BreadcrumbItem>
                    </Breadcrumb>
                </Column>
            </Row>
        </Grid>
        <br /><Divider class="grey lighten-2" />

        <div class="d-flex justify-center mt-4 mb-4">
            <Grid>
                <Row>
                    <h3 style="margin-bottom: 1.5rem">
                        Doramonangis New Dorayaki
                    </h3>
                </Row>
            </Grid>
        </div>

        <div class="d-flex justify-center mt-4 mb-4">
            <Grid>
                <Row>
                    <Column>
                        <Form on:submit={newdorayaki}>
                            <FormGroup legendText="Rasa">
                                <TextInput
                                    {disabled}
                                    placeholder="Masukkan rasa"
                                    bind:value={rasa}
                                    invalid={invalidrasa}
                                    invalidText={invalidrasamsg}
                                    on:keydown={() => {
                                        if (invalidrasa) {
                                            invalidrasa = false;
                                        }
                                    }}
                                />
                            </FormGroup>
                            <FormGroup legendText="Deskripsi">
                                <TextInput
                                    {disabled}
                                    placeholder="Masukkan deskripsi"
                                    bind:value={deskripsi}
                                    invalid={invaliddeskripsi}
                                    invalidText={invaliddeskripsimsg}
                                    on:keydown={() => {
                                        if (invaliddeskripsi) {
                                            invaliddeskripsi = false;
                                        }
                                    }}
                                />
                            </FormGroup>
                            <FormGroup legendText="Gambar (URL)">
                                <TextInput
                                    {disabled}
                                    placeholder="Masukkan URL gambar"
                                    bind:value={gambar}
                                    invalid={invalidgambar}
                                    invalidText={invalidgambarmsg}
                                    on:keydown={() => {
                                        if (invalidgambar) {
                                            invalidgambar = false;
                                        }
                                    }}
                                />
                            </FormGroup>
                            <Button
                                {disabled}
                                icon={Add20}
                                type="submit"
                                style="color: white;"
                            >
                                Register
                            </Button>
                        </Form>
                    </Column>
                    <Column>
                        <Dorayaki {...{ rasa, deskripsi, gambar }} />
                    </Column>
                </Row>
            </Grid>
        </div>
    </Content>
</Theme>
