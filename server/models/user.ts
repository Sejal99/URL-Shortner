import mongoose, { Document, Model } from 'mongoose';
import { createHmac, randomBytes } from 'crypto';

// Define the interface for the user document
interface IUser extends Document {
    email: string;
    password: string;
    role: string;
    salt: string;
}

// Define the static methods for the user model
interface IUserModel extends Model<IUser> {
    matchPassword(email: string, password: string): Promise<IUser | null>;
}

// Define the schema
const userSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        default: 'NORMAL',
        required: true,
    },
    salt: {
        type: String,
     
    },
}, { timestamps: true });

// Define the pre-save hook
userSchema.pre<IUser>("save", function (next) {
    const user = this;
    if(!user.isModified("password")) {return}
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex');
    this.salt = salt;
    this.password = hashedPassword;
    next();
});

// Define the static method for matching password
userSchema.static('matchPassword', async function (email: string, password: string): Promise<IUser | null> {
 
    const user = await this.findOne({ email });
    
    if (!user) {
        throw new Error('User not found');
    }

    const salt = user.salt;
    
    const hashedPassword = user.password;
    const userProvidedHash = createHmac('sha256', salt).update(password).digest('hex');

    if (hashedPassword !== userProvidedHash) {
        return null
    }

    return user;
});


export const userModel: IUserModel = mongoose.model<IUser, IUserModel>('user', userSchema);
