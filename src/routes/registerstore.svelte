<script>
    import {
        Content,
        Breadcrumb,
        BreadcrumbItem,
        Grid,
        Row,
        Column,
        TextInput,
        Button,
        Form,
        FormGroup,
    } from "carbon-components-svelte";
    import { onMount } from "svelte";
    import Header from "./../components/Header.svelte";
    import Theme from "./../components/Theme.svelte";
    import { getloggedinfo } from "./../js/auth.js";
    import { createToko } from "./../js/tokoapi.js";
    import Login16 from "carbon-icons-svelte/lib/Login16";
    import { Divider } from "svelte-materialify";

    let theme = "g10";
    let loginval = getloggedinfo();

    let invalidnama = false,
        invalidnamamsg,
        invalidjalan = false,
        invalidjalanmsg,
        invalidkecamatan = false,
        invalidkecamatanmsg,
        invalidprov = false,
        invalidprovmsg;

    let nama, jalan, kecamatan, provinsi;

    let disabled = false;
    let openmodal = false;
    let modalmsg = "";

    const registerform = async () => {
        disabled = true;
        invalidnama = false;
        invalidjalan = false;
        invalidkecamatan = false;
        invalidprov = false;

        if (!nama || !jalan || !kecamatan || !provinsi) {
            if (!nama) {
                invalidnama = true;
                invalidnamamsg = "Empty input!";
            }
            if (!jalan) {
                invalidjalan = true;
                invalidjalanmsg = "Empty input!";
            }
            if (!kecamatan) {
                invalidkecamatan = true;
                invalidkecamatanmsg = "Empty input!";
            }
            if (!provinsi) {
                invalidprov = true;
                invalidprovmsg = "Empty input!";
            }
            disabled = false;
            return;
        }
        let out = await createToko({
            nama: nama,
            jalan: jalan,
            kecamatan: kecamatan,
            provinsi: provinsi,
        });
        disabled = false;
        invalidnama = false;
        invalidnamamsg = "";
        invalidjalan = false;
        invalidjalanmsg = "";
        invalidkecamatan = false;
        invalidkecamatanmsg = "";
        invalidprov = false;
        invalidprovmsg = "";
        location.href = "#/login";
    };

    $: (() => {
        if (loginval) location.href = "#/";
    })();
</script>

<svelte:head>
    <title>Doramonangis - Register</title>
</svelte:head>

<Theme persist bind:theme>
    <Header />
    <Content style="background: none; padding: 1rem">
        <Grid>
            <Row>
                <Column lg={16}>
                    <Breadcrumb noTrailingSlash aria-label="Page navigation">
                        <BreadcrumbItem href="#/">Home</BreadcrumbItem>
                        <BreadcrumbItem>Register</BreadcrumbItem>
                    </Breadcrumb>
                </Column>
            </Row>
        </Grid>
        <br /><Divider class="grey lighten-2" />

        <div class="d-flex justify-center mt-4 mb-4">
            <Grid>
                <Row>
                    <h3 style="margin-bottom: 1.5rem">
                        Doramonangis Register Store
                    </h3>
                </Row>
            </Grid>
        </div>

        <div class="d-flex justify-center mt-4 mb-4">
            <Form on:submit={registerform}>
                <FormGroup legendText="General">
                    <TextInput
                        {disabled}
                        placeholder="Masukkan nama toko"
                        bind:value={nama}
                        invalid={invalidnama}
                        invalidText={invalidnamamsg}
                        on:keydown={() => {
                            if (invalidnama) {
                                invalidnama = false;
                            }
                        }}
                    />
                </FormGroup>
                <FormGroup legendText="Address">
                    <TextInput
                        {disabled}
                        placeholder="Masukkan nama jalan"
                        bind:value={jalan}
                        invalid={invalidjalan}
                        invalidText={invalidjalanmsg}
                        on:keydown={() => {
                            if (invalidjalan) {
                                invalidjalan = false;
                            }
                        }}
                    />
                    <TextInput
                        {disabled}
                        placeholder="Masukkan nama kecamatan"
                        bind:value={kecamatan}
                        invalid={invalidkecamatan}
                        invalidText={invalidkecamatanmsg}
                        on:keydown={() => {
                            if (invalidkecamatan) {
                                invalidkecamatan = false;
                            }
                        }}
                    />
                    <TextInput
                        {disabled}
                        placeholder="Masukkan nama provinsi"
                        bind:value={provinsi}
                        invalid={invalidprov}
                        invalidText={invalidprovmsg}
                        on:keydown={() => {
                            if (invalidprov) {
                                invalidprov = false;
                            }
                        }}
                    />
                </FormGroup>
                <Button {disabled} icon={Login16} type="submit" style="color: white;">
                    Register
                </Button>
            </Form>
        </div>
    </Content>
</Theme>
