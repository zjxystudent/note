- `// @ts-check ` 自动类型推断功能
- `// @ts-ignore`  单行忽略

# 枚举 enum
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

## 去除属性 Omit

```ts
export interface OmitType = Omit<Book, "ISBN" | "book_name" | "book_price">;
 OmitType{
  book_store_count: string;
  book_publish: string; 
};
```

## 提取属性 Pick

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

## 属性全转为可选 Partial

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

## 属性全转为必选 Required

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