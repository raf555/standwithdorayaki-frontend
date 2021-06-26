<script>
  import {
    Content,
    Breadcrumb,
    BreadcrumbItem,
    Grid,
    Row,
    Column,
    Select,
    SelectItem,
    Button
  } from "carbon-components-svelte";
  import { onMount, onDestroy } from 'svelte';
  import Header from "./../components/Header.svelte";
  import Theme from "./../components/Theme.svelte";
  import { getloggedinfo, key, verifylogin, logout } from "./../js/auth.js";
  //import { Button } from 'svelte-materialify';

  let theme = "g10";

  let loginval = getloggedinfo();
  let loginkey = key;

  const verifylogindata = async () => {
    let valid = getloggedinfo();
    if (!valid) {
      loginval = undefined;
    } else {
      let toko = await verifylogin(valid.id);
      if (!toko) {
        loginval = undefined;
      }
    }
  }

  onMount(async () => {
    await verifylogindata();
  });

  $: (() => {if (!loginval) location.href = "#/login";})()
</script>

<svelte:head>
	<title>Doramonangis - Home</title>
</svelte:head>

<Theme persist bind:theme>
  <Header />
  <Content style="background: none; padding: 1rem">
    <Grid>
      <Row>
        <Column lg="{16}">
          <Breadcrumb noTrailingSlash aria-label="Page navigation">
            <BreadcrumbItem href="#/">Home /</BreadcrumbItem>
          </Breadcrumb>
          <h1 style="margin-bottom: 1.5rem">Doramonangis Admin</h1>
        </Column>
      </Row>
      <Row>
        <Column>
          <Select
          labelText="Carbon theme"
          bind:selected="{theme}"
          style="margin-bottom: 1rem"
        >
          <SelectItem value="white" text="White" />
          <SelectItem value="g10" text="Gray 10" />
          <SelectItem value="g90" text="Gray 90" />
          <SelectItem value="g100" text="Gray 100" />
        </Select>
        </Column>
        <Column></Column>
      </Row>
      <Row>        
        <Column>
          {#if !loginval}
            Not logged in
          {:else}
            Logged in as {loginval.nama}
            <br/><br/>
            <Button on:click={() => {logout(); loginval = null}}>Logout</Button>
          {/if}
        </Column>
      </Row>
    </Grid>
  </Content>
</Theme>
