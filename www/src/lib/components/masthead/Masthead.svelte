<script lang="ts">
	import * as Navigation from "../menu/index";
	import { Icon } from "../svg";
	import { Link } from "../link";

	import styles from "./masthead.module.css";
</script>

<header class={`container ${styles.masthead}`}>
	<section label="logo">
		<Link href="/">
			<Icon viewBox="0 0 36 36">
				<path fill="#e94280" d="M25.05,27,11,32.88c-.85.34-1.53-.08-1.53-.93V25.16A2.62,2.62,0,0,1,11,23l14.1-5.78c.85-.34,1.53.09,1.53.94V24.9A2.49,2.49,0,0,1,25.05,27Z" />
				<path fill="#655aa3" d="M9.42,17.87v-6.8c0-.85.68-1.27,1.53-.93l14.1,5.77a2.62,2.62,0,0,1,1.53,2.21v6.79c0,.85-.68,1.28-1.53.94L11,20A2.5,2.5,0,0,1,9.42,17.87Z" />
				<path fill="#fdc21a" d="M25.05,13,11,18.83c-.85.34-1.53-.09-1.53-.94V11.1A2.62,2.62,0,0,1,11,8.89l14.1-5.77c.85-.34,1.53.08,1.53.93v6.79A2.5,2.5,0,0,1,25.05,13Z" />			
			</Icon>
			Slidy
		</Link>
	</section>
	<section label="navigation">
		<Navigation.Container>
			<Navigation.Item href="/" pattern={/\/home/}>
				Home
			</Navigation.Item>
			<Navigation.Item href="/docs" pattern={/\/docs/}>
				Docs
			</Navigation.Item>
		</Navigation.Container>
	</section>
</header>