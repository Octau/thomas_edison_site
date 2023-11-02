import { UserModel } from 'api-hooks/user';
import { Expose, Type } from 'class-transformer';
import { CommonParamInput } from 'common/repositories/common.model';
import { formatDateTime } from 'common/utils/date';

// Model

export class MetadataPropertyModel {
  url: string;

  @Expose({ name: 'ip_address' })
  ipAddress: string;

  @Expose({ name: 'user_agent' })
  userAgent: string;
}

export class PropertyModel {
  attributes?: { [key: string]: any };
  old?: { [key: string]: any };

  @Type(() => MetadataPropertyModel)
  metadata: MetadataPropertyModel;
}

export class AuditLiteModel {
  id: string;
  event: string;
  modified: { [key: string]: any };
  changelogs: string[];
  action: string | null;

  @Expose({ name: 'subject_id' })
  subjectId: string;

  @Expose({ name: 'subject_type' })
  subjectType: string;

  @Expose({ name: 'user_id' })
  userId: string;

  @Expose({ name: 'user_type' })
  userType: string;

  @Type(() => UserModel)
  user: UserModel;

  @Expose({ name: 'created_at' })
  @Type(() => Date)
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  @Type(() => Date)
  updatedAt: Date;

  @Type(() => PropertyModel)
  properties: PropertyModel;

  getCreatedDate() {
    return formatDateTime(this.createdAt);
  }
  getUpdatedDate() {
    return formatDateTime(this.updatedAt);
  }
}

// Input

export type getActivitiesInput = {
  params?: CommonParamInput;
  id: string;
};
