const translit = (str: string): string => {
	const ru =
		'А-а-Б-б-В-в-Ґ-ґ-Г-г-Д-д-Е-е-Ё-ё-Є-є-Ж-ж-3-з-И-и-I-i-Ї-ї -Й-й-К-к-Л-л-М-м-Н-н-О-о-П-п-Р-р-С-с-T-т-У-у-Ф-ф-Х-×-Ц-ц -Ч-ч-Ш-ш-Щ-щ-ъ-ъ-Ы-ы-ь-ь-Э-э-Ю-ю-Я-я'.split(
			'-'
		)

	const en =
		"A-a-B-b-V-v-G-g-G-g-D-d-E-e-E-e-E-e-ZH-zh-Z-z-I-i-I-i-I -i-J-j-K-k-L-l-M-m-N-n-О-o-P-p-R-r-S-s-T-t-U-u-F-f-H-h-T-S-ts-CH-ch-SH-sh-SCH-sch-'-'-Y-y-'-'-E-e-YU-yu-YA-ya".split(
			'-'
		)

	let res = ''

	for (let i = 0; i < str.length; i++) {
		const s = str.charAt(i),
			n = ru.indexOf(s)

		if (n >= 0) {
			res += en[n]
		} else {
			res += s
		}
	}

	return res
}

export const generateSlug = (str: string): string => {
	let url: string = str.replace(/[\s]+/gi, '-')
	url = translit(url)
	// eslint-disable-next-line
	url = url
		.replace(/[^0-9a-z_\-]+/gi, '')
		.replace('---', '-')
		.replace('--', '-')
		.toLowerCase()
	return url
}
