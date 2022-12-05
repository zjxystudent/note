# 类型操作
```ts
interface Book {
  ISBN: string;
  book_name: string;
  book_price: number;
  book_store_count: string; //库存数量
  book_publish: string; // 出版社
}
```

## Omit-去除属性

```ts
export interface OmitType = Omit<Book, "ISBN" | "book_name" | "book_price">;
 OmitType{
  book_store_count: string;
  book_publish: string; 
};
```

## Pick-提取属性

实际工作中，主要用来提取接口或 type 定义的对象类型中的属性
```ts
//提取出3个属性
export interface PickType = Pick<Book, "ISBN" | "book_name" | "book_price">;
 PickType{
  ISBN: string;
  book_name: string;
  book_price: number;
};
```

## Partial-属性全转为可选

```typescript
export interface PartialType= Partial<Book>
PartialType{
  ISBN?: string;
  book_name?: string;
  book_price?: number;
  book_store_count?: string;
  book_publish?: string; 
}
```

## Required-属性全转为必选

```typescript
export interface RequiredType= Required<Book>
RequiredType{
  ISBN: string;
  book_name: string;
  book_price: number;
  book_store_count: string;
  book_publish: string; 
}
```


https://juejin.cn/post/7170662948656906253#heading-5