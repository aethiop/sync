
<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf';

  import Progress from '../../components/atoms/Progress.svelte';
</script>

<Meta title="Andromeda/Atoms/Progress" component={Progress} />

<Story name="Initial">
  <Progress progress={0} />
</Story>

<Story name="Half">
  <Progress progress={50} />
</Story>

<Story name="Full">
  <Progress progress={100} />
</Story>