import {
  UserNotification,
  userNotificationPayloadSchema,
} from './zod-schemas/notifications';

type NormalizedNotification = {
  title: string;
  description: string;
  image: string;
  type: UserNotification['type'] | 'unknown';
} & (
  | {
      actionType: 'link';
      href: string;
    }
  | {
      actionType: 'button';
    }
);
export const parseNotification = (notificationPayload: unknown) => {
  try {
    const notification =
      userNotificationPayloadSchema.parse(notificationPayload);
    switch (notification.type) {
      case 'invitedToOrganization':
        return {
          title: 'Invitation to join organization',
          description: `You have been invited to join ${notification.organizationName}`,
          // 2 days ago
          href: `/invitations/${notification.invitationId}`,
          image: '/logos/ico_orange.svg',
          actionType: 'link',
          type: notification.type,
        } as NormalizedNotification;
      case 'acceptedOrganizationInvitation':
        return {
          title: 'Accepted invitation to join organization',
          description: `${notification.userFullName} has accepted your invitation to join your organization`,
          href: `/organization/${notification.organizationId}/settings/members`,
          image: '/logos/ico_orange.svg',
          actionType: 'link',
        } as NormalizedNotification;
      case 'welcome':
        return {
          title: 'Welcome to Incented',
          description:
            'Welcome to Incented. We are glad to see you here!',
          actionType: 'button',
          image: '/logos/ico_orange.svg',
          type: notification.type,
        } as NormalizedNotification;
      default: {
        return {
          title: 'Unknown notification type',
          description: 'Unknown notification type',
          href: '#',
          image: '/logos/ico_orange.svg',
          actionType: 'link',
          type: 'unknown',
        } as NormalizedNotification;
      }
    }
  } catch (error) {
    return {
      title: 'Unknown notification type',
      description: 'Unknown notification type',
      image: '/logos/ico_orange.svg',
      actionType: 'button',
      type: 'unknown',
    } as NormalizedNotification;
  }
};
