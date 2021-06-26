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
    } from "carbon-components-svelte";
    import Header from "./../components/Header.svelte";
    import Theme from "./../components/Theme.svelte";
  
    let theme = "g10";
  </script>
  
  <Theme persist bind:theme>
    <Header />
    <Content style="background: none; padding: 1rem">
      <Grid>
        <Row>
          <Column lg="{16}">
            <Breadcrumb noTrailingSlash aria-label="Page navigation">
              <BreadcrumbItem href="#/">Home</BreadcrumbItem>
              <BreadcrumbItem>Tes /</BreadcrumbItem>
            </Breadcrumb>
            <h1 style="margin-bottom: 1.5rem">Ini tes</h1>
          </Column>
        </Row>
      </Grid>
    </Content>
  </Theme>
  