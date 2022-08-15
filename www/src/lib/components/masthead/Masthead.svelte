<script lang="ts">
	import { base } from '$app/paths';
	import * as Navigation from '../menu/index';
	import { Link } from '../link';

	import styles from './masthead.module.css';
</script>

<header class={`contents ${styles.masthead}`}>
	<section label="logo">
		<Link href="{base}/">
			<img src="{base}/Slidy.svg" width="32" height="32" />
			Slidy
		</Link>
	</section>
	<section label="navigation">
		<Navigation.Container>
			<Navigation.Item href="{base}/" pattern={/\/home/}>Home</Navigation.Item>
			<Navigation.Item href="{base}/playground" pattern={/\/playground/}>
				Playground
			</Navigation.Item>
			<Navigation.Item href="{base}/docs" pattern={/\/docs/}>Docs</Navigation.Item>
		</Navigation.Container>
	</section>
</header>
