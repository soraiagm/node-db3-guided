SELECT s.CompanyName as SuppliedBy, p.ProductName, c.CategoryName
FROM product as p

JOIN supplier as s
    on s.ID = p.SupplierId
JOIN category as c
    on p.CategoryId = c.Id
    
WHERE p.id = 5;