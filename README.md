# chat-space DB設計
## users テーブル
|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false|
|email|string|null: false|
|password||string|null: false|
### Association
- has_many :groups, through: :users_groups
- has_many :messages

## groups テーブル
|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false|
### Association
- has_many :users, through: :users_groups
- has_many :massages

## messages テーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|text||
|timestamps|timestamp|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## users_groups テーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user