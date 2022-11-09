import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import { OrderProduct } from '../../models/order-product';
import { Product } from '../../models/product';
import { Order } from '../../models/order';
import { User } from '../../models/user';
import app from '../../server';

