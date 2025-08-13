import { BadRequestException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

const salt_or_rounds = 10

export class BcryptEncryption {
    static encrypt(password: string) {
        try {
            return bcrypt.hashSync(password, salt_or_rounds)
        } catch (error) {
            throw new BadRequestException(`Error on Encrypt ${error}`)
        }
    }

    static compare(password: string, hashedPassword: string) {
        try {
            return bcrypt.compareSync(password, hashedPassword)
        } catch (error) {
            throw new BadRequestException(`Error on Compare ${error}`)
        }
    }
}