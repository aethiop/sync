<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf';

  import Text from '../../components/atoms/Text.svelte';
</script>

<Meta title="Andromeda/Atoms/Text" component={Text} />

<Story name="Title">
  <Text type="title" >The quick brown fox jumps over the lazy dog.</Text>
</Story>

<Story name="H1">
  <Text type="h1" >The quick brown fox jumps over the lazy dog.</Text>
</Story>

<Story name="H2">
  <Text type="h2" >The quick brown fox jumps over the lazy dog.</Text>
</Story>
<Story name="H3">
  <Text type="h3" >The quick brown fox jumps over the lazy dog.</Text>
</Story>