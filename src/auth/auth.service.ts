import { Injectable } from '@nestjs/common'
// import {User} from '@prisma/client'

@Injectable()
export class AuthService {

	async register() {
		// const user: User

		return {
			name: 'Aladdin',
		}
	}
}
