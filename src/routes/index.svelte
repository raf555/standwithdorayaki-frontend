<script>
  import {
    Content,
    Breadcrumb,
    BreadcrumbItem,
    Grid,
    Row,
    Column
  } from "carbon-components-svelte";
  import { onMount, onDestroy } from "svelte";
  import Header from "./../components/Header.svelte";
  import Theme from "./../components/Theme.svelte";
  import { getloggedinfo, verifylogindata, logout } from "./../js/auth.js";
  import {
    Card,
    CardText,
    CardActions,
    Button as MButton,
  } from "svelte-materialify";
  //import { Button } from 'svelte-materialify';

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
            <BreadcrumbItem href="#/">Home /</BreadcrumbItem>
          </Breadcrumb>
        </Column>
      </Row>
    </Grid>

    <div class="d-flex justify-center mt-4 mb-4">
      <Grid>
        <Row>
          <h3 style="margin-bottom: 1.5rem">Doramonangis Admin</h3>
        </Row>
      </Grid>
    </div>

    <div class="d-flex justify-center mt-4 mb-4">
      <Card shaped hover style="max-width:300px;margin:10px">
        <img src="//picsum.photos/300" alt="background" />
        <CardText>
          <div class="text--primary text-h4">Dorayaki</div>
          <div class="text--primary">
            Cek daftar dorayaki yang ada
          </div>
        </CardText>
        <CardActions>
          <MButton text class="primary-text">Click here</MButton>
        </CardActions>
      </Card>
      <Card shaped hover style="max-width:300px;margin:10px">
        <img src="//picsum.photos/300" alt="background" />
        <CardText>
          <div class="text--primary text-h4">Toko Dorayaki</div>
          <div class="text--primary">
            Cek daftar toko dorayaki yang ada
          </div>
        </CardText>
        <CardActions>
          <MButton text class="primary-text">Click here</MButton>
        </CardActions>
      </Card>
    </div>
  </Content>
</Theme>
