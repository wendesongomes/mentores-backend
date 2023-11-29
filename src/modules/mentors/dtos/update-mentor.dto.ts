import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxDate, MaxLength, isBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Match } from '../decorators/match.decorator';
import { Specialties } from '../enums/specialties.enum';
import { Gender } from '../enums/gender.enum';

export class UpdateMentorDto {

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "the 'fullName' field must not be empty" })
  @MaxLength(100, { message: 'Maximum of 100 characters exceeded' })
  @ApiProperty({
    required: true,
    example: 'Fulano de tal',
  })
  fullName?: string;

  @IsOptional()
  @IsNotEmpty({ message: "The dateOfBirth field must not be empty"})
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MaxDate(new Date(), {
    message: 'The date must be before the current date',
  })
  @ApiProperty({
    required: true,
    example: '2023-04-06',
    type: "Date"
  })
  dateOfBirth?: Date | string;

  @IsOptional()
  @IsString({ message: 'Only strings are allowed in this field' })
  @IsEmail(undefined, {
    message: 'Invalid e-mail format',
  })
  @MaxLength(100, { message: 'Maximum of 100 characters exceeded' })
  @IsNotEmpty({ message: "the 'email' field must not be empty" })
  @Transform(({ value }) => value.toLowerCase())
  @ApiProperty({
    required: true,
    example: 'fulano.de.tal@dominio.com',
  })
  email?: string;

  @IsOptional()
  @IsArray()
  @IsEnum(Specialties, { each: true})
  @IsString({ each: true})
  @ArrayMinSize(1)
  @ArrayMaxSize(6)
  @ApiProperty({
    required: true,
    type: "String array",
    example: 'Front-End, Back-End, QA, Dev Ops',
  })
  specialties?: string[];

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "the 'role' field must not be empty" })
  @MaxLength(50, { message: 'Maximum of 50 characters exceeded' })
  @ApiProperty({
    required: true,
    example: 'Cargo X | Empresa Y',
  })
  role?: string;

  @IsOptional()
  @IsEnum(Gender)
  @IsString()
  @ApiProperty({
    required: true,
    type: "String array",
    example: 'Não binário',
  })
  gender?: string;

  @IsString()
  @IsOptional()
  @MaxLength(600, {message: 'Maximum text length exceeded'})
  aboutMe?: string

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  registerComplete?: boolean

  @IsNotEmpty({ message: "the 'password' field must not be empty" })
  @IsString({ message: 'Only strings are allowed in this field' })
  @Matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>])[a-zA-Z\d!@#$%^&*()\-_=+{};:,<.>.]{8,}$/,
    {
      message:
        'Password must have a minimum of 8 characters, a capital letter, a number and a symbol',
    },
  )

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Imagem do perfil',
  })
  profile?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Chave para remoção da imagem do perfil',
  })
  profileKey?: string;

  @IsOptional()
  file?: any;
}