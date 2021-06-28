<script>
    import {
        Content,
        Breadcrumb,
        BreadcrumbItem,
        Grid,
        Row,
        Column,
    } from "carbon-components-svelte";
    import { onMount, onDestroy } from "svelte";
    import Header from "./../components/Header.svelte";
    import Theme from "./../components/Theme.svelte";
    import { getloggedinfo, verifylogindata, logout } from "./../js/auth.js";
    import {
        Col as MCol,
        Row as MRow,
        Tabs,
        Tab,
        TabContent,
    } from "svelte-materialify";
    import { Divider } from "svelte-materialify";

    let theme = "g10";

    let loginval = getloggedinfo();

    onMount(async () => {
        loginval = await verifylogindata();
    });

    $: (() => {
        if (!loginval) location.href = "#/login";
    })();
</script>

<svelte:head>
    <title>Doramonangis - Home</title>
</svelte:head>

<Theme persist bind:theme>
    <Header />
    <Content style="background: none; padding: 1rem">
        <Grid>
            <Row>
                <Column lg={16}>
                    <Breadcrumb noTrailingSlash aria-label="Page navigation">
                        <BreadcrumbItem href="/#/">Home /</BreadcrumbItem>
                    </Breadcrumb>
                </Column>
            </Row>
        </Grid>
        <br /><Divider class="grey lighten-2" />

        <div class="d-flex justify-center mt-4 mb-4 elevation-2">
            <MRow class="align-start" noGutters>
                <MCol style="max-width: 512px; max-height: 512px;">
                    <div class="pa-2 elevation-3" style="height: 300px; margin: 10px;">
                        <img
                            alt="Gambar dorayaki"
                            style="max-width: 100%; max-height: 100%; display: block; margin: auto"
                            src="https://asset.kompas.com/crops/lA7VZxbEj-nnz_sq13gQBdcxiaI=/0x0:1000x667/750x500/data/photo/2020/07/19/5f13dd959ae40.jpg"
                        />
                    </div>
                    
                    <div class="pa-2 elevation-3" style="height: 40px; margin: 10px;">
                        <div style="margin: 2px">
                            Last Updated: xx - xx - xxxx - xx:xx:xx
                        </div>
                    </div>
                </MCol>
                <MCol>
                    <div class="pa-2 elevation-3" style="height: 350px; margin: 10px">
                        <Tabs grow>
                            <div slot="tabs">
                                <Tab>Info</Tab>
                                <Tab>Edit</Tab>
                            </div>
                            <Divider />
                            <br />
                            <TabContent>
                                <div style="margin:10px">
                                    <h4>Dorayaki - Rasa Mangga</h4>
                                    <p>Dorayaki ini enak banget kajflkajfksjalf kfjdlfk jdlkfj dlkf j</p>
                                </div>
                            </TabContent>
                            <TabContent>
                                <div style="margin:10px">
                                    <h4>Info</h4>
                                    <p>sffsfs</p>
                                </div>
                            </TabContent>
                        </Tabs>
                    </div>
                </MCol>
            </MRow>
        </div>
    </Content>
</Theme>
