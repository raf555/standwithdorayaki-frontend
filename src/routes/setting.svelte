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
    RadioButtonGroup,
    RadioButton
  } from "carbon-components-svelte";
  import { onMount, onDestroy } from "svelte";
  import Header from "./../components/Header.svelte";
  import Theme from "./../components/Theme.svelte";
  import { Divider } from "svelte-materialify";
  let theme = "g10";
</script>

<svelte:head>
  <title>SWD - Setting</title>
</svelte:head>

<Theme persist bind:theme>
  <Header />
  <Content style="background: none; padding: 1rem">
    <Grid>
      <Row>
        <Column lg={16}>
          <Breadcrumb noTrailingSlash aria-label="Page navigation">
            <BreadcrumbItem href="#/">Home</BreadcrumbItem>
            <BreadcrumbItem>Setting</BreadcrumbItem>
          </Breadcrumb>
        </Column>
      </Row>
    </Grid>
    <br /><Divider class="grey lighten-2" />

    <div class="d-flex justify-center mt-4 mb-4">
      <Grid>
        <Row>
          <h3 style="margin-bottom: 1.5rem">Stand With Dorayaki - Setting</h3>
        </Row>
      </Grid>
    </div>

    <div class="d-flex justify-center mt-4 mb-4">
      <Form>
        <FormGroup legendText="Theme">
          <RadioButtonGroup name="radio-button-group" bind:selected={theme}>
            <RadioButton value="white" labelText="White" />
            <RadioButton value="g10" labelText="Greyish" />
            <RadioButton value="g90" labelText="Grey Dark" />
            <RadioButton value="g100" labelText="Full Dark" />
          </RadioButtonGroup>
        </FormGroup>
      </Form>
    </div>
  </Content>
</Theme>
