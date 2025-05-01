<script lang="ts" module>
	import { pathAuthor, pathGithub, pathLicence } from '$lib/paths';
	import { Link } from '../link';

	import styles from './footer.module.css';
</script>

<footer class="{styles.footer} surface-2">
	<div class="container wrapper">
		<section aria-label="user">
			<span>
				<Link href={pathGithub}>Slidy</Link> is released under the <Link href={pathLicence}
					>MIT licence</Link
				>
			</span>
			<span>
				© {new Date().getFullYear()}
				<Link href={pathAuthor}>Alexander Volkov & Slidy Contributors</Link>
			</span>
		</section>
	</div>
</footer>
